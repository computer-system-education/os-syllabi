# Operating Systems and Systems Programming (Fall 2018)

## Course info

- Instructors: **Ion Stoica**
- Textbook: Operating Systems: Principles and Practice
- URL: https://inst.eecs.berkeley.edu/~cs162/fa18/

## Outline

1. Introduction
2. Process
3. Processes, fork
4. I/O, files, sockets, networking
5. Concurrency: processes and threads
   - IPC
   - Client-server
   - Socket
   - Context switching
   - Process lifecycle
   - Process scheduling
   - Process queues
   - Shared vs. per-thread state
   - Thread API
   - yield()
6. Cooperating threads, synchronization
   - I/O blocking and thread switching
   - Thread abstraction
   - Thread lifecycle
   - Use cases of multi-threading
   - User-level thread vs. kernel-level thread
   - Multicore
   - Hyperthreading
7. Mutual exclusion, lock implementation
   - User-kernel mode switching
   - In-kernel threads
   - Thread switch
   - Example: threaded web server
   - Example: ATM server
   - Event-driven vs. multi-threading
   - Too-much-milk problem
8. Synchronization: lock, semaphores
   - Locks
   - Semaphores
   - Monitors
   - Send/receive
   - Disable/enable interrupts
   - Producer-consumer problem
   - Atomic instructions
9. Synchronization: condition variables, readers/writers
   - Mesa vs. Hoare monitors
   - Readers/writers problem
   - CPU scheduling (beginning)
10. Advanced scheduling
11. Deadlock, address translation, virtual memory
12. Address translation (1)
13. Address translation (2) 
14. Caching, demand paging
15. Demand paging
16. I/O
17. Input/output, I/O layers, storage devices, I/O performance, low-level optimization
18. File systems design: FAT, FFS, NTFS, COW
19. File systems, MMAP
20. Reliability, transactions, distributed system
21. Layering, end-to-end argument
22. TCP flow control
