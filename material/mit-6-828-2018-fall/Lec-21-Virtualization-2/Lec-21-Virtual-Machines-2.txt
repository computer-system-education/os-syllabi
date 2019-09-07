6.828 2016 Lecture 19: Virtual Machines, Dune

Read: Dune: Safe User-level Access to Privileged CPU features, Belay et al,
OSDI 2012.

Plan:
  virtual machines
  x86 virtualization and VT-x
  Dune

*** Virtual Machines

what's a virtual machine?
  simulation of a computer, accurate enough to run an O/S

diagram: h/w, host/VMM, guest kernels, guest processes
  VMM might run in a host O/S, e.g. OSX
    or VMM might be stand-alone

why are we talking about virtual machines?
  VMM is a kind of kernel -- schedules, isolates, allocates resources
  modern practice is for VMM and guest O/S to cooperate
  can use VMs to help solve O/S problems

why use a VM?
  run lots of guests per physical machine
    often individual services requires modest resources
    would waste most of a dedicated server
    for cloud and enterprise computing
  better isolation than processes
  one computer, multiple operating systems (OSX and Windows)
  kernel development environment (like qemu)
  tricks: checkpoint, migrate, expand

VMs are an old idea
  1960s: IBM used VMs to share big machines
  1990s: VMWare re-popularized VMs, for x86 hardware

how accurate must a VM be?
  usual goal:
    impossible for guest to distinguish VM from real computer
    impossible for guest to escape its VM
  must allow standard O/S to boot, run
  handle malicious software
    cannot let guest break out of virtual machine!
  some VMs compromise, require guest kernel modifications

why not simulation (e.g, Qemu)?
  VMM interprets each guest instruction
  maintain virtual machine state for each guest
    eflags, %cr3, &c
  correct but slow

idea: execute guest instructions on real CPU 
  works fine for most instructions
    e.g. add %eax, %ebx
  what if the guest kernel executes a privileged instruction?
    e.g. IRET into user-level, or load into %cr3
    can't let the guest kernel really run at CPL=0 -- could break out

idea: run each guest kernel at CPL=3
  ordinary instructions work fine
  privileged instructions will (usually) trap to the VMM
  VMM emulates
    maybe apply the privileged operation to the virtual state
    maybe transform e.g. page table and apply to real hardware
  "trap-and-emulate"

what x86 state must a trap-and-emulate VMM "virtualize"?
  b/c guest can't be allowed to see/change the real machine state.
  %cr3
  pagetable
  IDT
  GDT
  CPL
  IF in EFLAGS
  %cr0 &c

Trap-and-emulate example -- CLI / STI
  VMM maintains virtual IF for guest
  VMM controls hardware IF
    Probably leaves interrupts enabled when guest runs
    Even if a guest uses CLI to disable them
  VMM looks at virtual IF to decide when to interrupt guest
  When guest executes CLI or STI:
    Protection violation, since guest at CPL=3
    Hardware traps to VMM
    VMM looks at *virtual* CPL
      If 0, changes *virtual* IF
      If not 0, emulates a protection trap to guest kernel
  VMM must cause guest to see only virtual IF
    and completely hide/protect real IF

trap-and-emulate is hard on an x86
  not all privileged instructions trap at CPL=3
  popf silently ignores changes to interrupt flag
  pushf reveals *real* interrupt flag
  can solve with binary translation, but complex
  page table is the hardest to virtualize efficiently
    VMM must install a modified copy of guest page table
    VMM must see guest writes to guest PTEs!

*** Hardware-supported virtualization

VT-x/VMX/SVM: hardware supported virtualization
  success of VMs resulted Intel and AMD adding support for virtualization
  makes it easy to implement virtual-machine monitor

VT-x: root and non-root mode
  diagram: VMCS, EPT, %cr3, page table
  VMM runs in VT-x "root mode"
    can modify VT-x control structures such as VMCS and EPT
  Guest runs in non-root mode
    has full access to the hardware, with privilege
      CPL=0, %cr3, IDT, &c
    but VT-x checks some operations and exits to VMM
  New instructions to change between root/non-root mode
    VMLAUNCH/VMRESUME: root -> non-root
    VMCALL: non-root -> root
    plus some interrupts and exceptions cause VM exit
  VM control structure (VMCS)
    Contains state to save or restore during transition
    Configuration (e.g., trap to root mode on page fault, or not)

for our pushf/popf interrupt-enable flag example
  guest uses the hardware flag
    pushf, popf, eflags, &c read/write the flag
      as long as CPL=0
    hardware seems to the guest to act normally
  when a device interrupt occurs
    VMCS lets VMM configure whether each interrupt goes to guest or host
    if guest:
      hardware checks guest interrupt-enable flag
      hardware vectors through guest IDT &c
      no need for exit to VMM
    if host:
      VT-x exits to VMM, VMM handles interrupt

VT-x: page tables
  EPT -- a *second* layer of address translation
  EPT is controlled by the VMM
  %cr3 is controlled by the guest
  guest virtual -cr3-> guest physical -EPT-> host physical
    %cr3 register holds a guest physical address
    EPT register holds a host physical address
  EPT is not visible to the guest
  so:
    guest can freely read/write %cr3, change PTEs, &c
      hardware sees these changes just as usual
    VMM can still provide isolation via EPT
  typical setup:
    VMM allocates some RAM for guest to use
    VMM maps guest physical addresses 0..size to RAM, in the EPT
    guest uses %cr3 to configure guest process address spaces

what prevents the guest from mapping and accessing the host's memory?
  and thus breaking isolation?

how to handle devices?
  VT-x selectively allows INB and OUTB
  also need to translate DMA addresses
    when guest wants to provide address of a DMA buffer to a device
    VT-d provides a mapping system for DMA devices to use
  but: rarely makes sense for guest to use real device
    want to share w/ other guests
    each guest gets a part of the disk
    each guest looks like a distinct Internet host
    each guest gets an X window
  VMM usually mimics some standard ethernet or disk controller
    regardless of actual h/w on host computer
  or guest might run special drivers that jump to VMM

*** Dune

the big idea:
  use VT-x to support Linux processes, rather than guest O/S kernels
  then process has fast direct access to %cr3, IDT, &c
  might allow new uses of paging not possible with Linux
  these goals are similar to those of the Exokernel

the general scheme -- diagram
  Dune is a "loadable kernel module" for Linux
  an ordinary process can switch into "Dune mode"
  a Dune-mode process is still a process
    has memory, can make Linux system calls, is fully isolated, &c
  but:
    isolated w/ VT-x non-root mode
      rather than with CPL=3 and page table protections
    memory protection via EPT -- Dune only adds
      entries referring to physical pages allocated
      to that process.
    system call via VMCALL (rather than INT)

why is it useful for Dune to use VT-x to isolate a process?
  process can manage its own page table via %cr3
    since it runs at CPL=0
  fast exceptions (page fault) via its own IDT
    no kernel crossings!
  can run sandboxed code at CPL=3
    so process can act like a kernel!

Example: sandboxed execution (paper section 5.1)
  suppose your web browser wants to run a 3rd-party plug-in
    it might be malicious or buggy
  browser needs a "sandbox"
    execute the plug-in, but limit syscalls / memory accesses
  assume browser runs as a Dune process:
    [diagram: browser CPL=0, plug-in CPL=3]
    create page table with PTE_U mappings for allowed memory
      and non-PTE_U mappings for rest of browser's memory
    set %cr3
    IRET into untrusted code, setting CPL=3
    plug-in can read/write image memory via page table
    plug-in can try to execute system calls
      but they trap into the browser
      and the browser can decide whether to allow each one
  can you do this in Linux?
    these specific techniques are not possible in Linux
      there's no user-level use of CPL, %cr3, or IDT
    fork, set up shared memory, and intercept syscalls
      but it's a pain

Example: garbage collection (GC)
  (modified Boehm mark-and-sweep collector)
  GC is mostly about tracing pointers to find all live data
    set a mark flag in every reached object
    any object not marked is dead, and its memory can be re-used
  GC can be slow b/c tracing pointers can take 100s of milliseconds
  The scheme:
    Mutator runs in parallel with tracer -- with no locks
    At some point the tracer has followed all pointers
      But the mutator may have modified pointers in already-traced objects
      It might have added a pointer that makes some unmarked object actually live
    Pause the mutator (briefly)
    Look at all pages the mutator has modifed since tracer started
      Re-trace all objects on those pages
  How does Dune help?
    Use PTE dirty bit (PTE_D) to detect written pages
    Clear all dirty bits when GC is done
    So program needs quick read and write access to PTEs

As with Exokernel, better user-level access to VM could help many programs
  see e.g. Appel and Li citation

How might Dune hurt performance?
  Table 2
    sys call overhead higher due to VT-x entry/exit
    faults to kernel slower, for same reason
    TLB misses slower b/c of EPT
  But they claim most apps aren't much affected
    b/c they don't spend much time in short syscalls &c
    Figure 3 shows Dune within 5% for most apss in SPEC2000 benchmark
      exceptions take lots of TLB misses

How much can clever use of Dune speed up real apps?
  Table 5 -- sped up web server w/ Wedge by 20%
  Table 6 -- GC
    overall benefit depends on how fast the program allocates
    huge effect on allocation-intensive micro-benchmarks
    no win for the only real application (XML parser)
      doesn't allocate much memory (so no win from faster GC)
      EPT overhead does slow it down
      but many real apps allocate more than this
  
How might Dune allow new functionality?
  sandboxing via CPL=3 and pagetable
  sthreads -- pagetable per thread, rather than per process
  and speed alone might make some ideas (GC, DSM, &c) feasible

Dune summary
  Dune implements processes with VT-x rather than ordinary page table
  Dune processes can use both Linux system calls AND privileged h/w
  allows fast process access to page tables and page faults
  allows processes to build kernel-like functionality
    e.g. separate page table per thread, or CPL=3 sandboxes
    hard to do this at all (let alone efficiently) with ordinary processes
