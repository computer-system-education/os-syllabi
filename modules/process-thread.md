## Process and Thread

### Prerequisite Modules

- Hardware ISA
- Virtual memory
- System call

### Module Syllabus

|                        | Basic                                           | Detailed                                  | Advanced                                |
| ---------------------- | ----------------------------------------------- | ----------------------------------------- | --------------------------------------- |
| Process                | Process != Program                              | Virtual address space layout (Corn-03)    | PCB of Solaris (UCSD-L03)               |
|                        | PCB (UCB-L05, Corn-L03)                         |                                           | PCB and state queues (UCSD-L03)         |
| Process lifecycle      | Process state transfer (Corn-L03)               | wait()                                    | Spawning a process (Stan-L02)           |
|                        | fork & exec, CreateProcess (Corn-L03, UCSD-L03) | signal() (Corn-03)                        | mini-shell (Stan-L02)                   |
|                        | Copy-on-write                                   |                                           | Web-server (UCSD-L03)                   |
| Thread                 | Execution context                               | yield(), join(), exit()                   | Implementing yield() (UCSD-L03)         |
|                        | Multi-threaded process                          | Preemptive scheduling (UCSD-L03)          |                                         |
| Context switch         | Context switch (UCB-L05)                        | Context switch cost (Stan-L04)            |                                         |
| Kernel- and user-level | Kernel stack (UCB-L02)                          | Kernel-level threads (Corn-L03, UCSD-L03) | Limitations of n:m threading (Stan-L02) |
|                        |                                                 | User-level threads (Corn-L03, Stan-L02)   |                                         |
|                        |                                                 |                                           |                                         |

### References

| University   | Year  | Lectures      |
| ------------ | ----- | ------------- |
| UCB CS-162   | 2018f | L02, L03, L05 |
| Corn CS-441  | 2018f | L03           |
| UCSD CSE-120 | 2018s | L03, L04      |
| Stan CS-140  | 2018w | L02, L04      |



