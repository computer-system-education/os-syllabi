## Synchronization

### Prerequisite Modules

- Process and thread
- Multicore

### Module Syllabus

|                         | Basic                                           | Detailed                             | Advanced                                              |
| ----------------------- | ----------------------------------------------- | ------------------------------------ | ----------------------------------------------------- |
| Problems                | Race condition (Corn-L5)                        | Producer-consumer problem (UCSD-L06) | Too-much-milk problem (UCB-L07, UIUC-L08)             |
|                         | Critical section and mutual exclusion (UCSD-L5) | Readers-writers problem (UCSD-L06)   |                                                       |
| Locking                 | Lock abstraction (UCSD-L5)                      | Peterson's algorithm (UCSD-L05)      | Memory consistency models (WU-L10)                    |
|                         | Spinlock (UCSD-L05)                             | Ticket lock                          | Lock in xv6 (MIT-L09)                                 |
|                         | Locks using interrupts (UCB-L08)                | Read-write lock (Harv-L20)           | C11 atomics (Stan-L07)                                |
|                         | Locks using atomic instructions (UCSD-L05)      | Futex (Harv-L20)                     |                                                       |
| Higher-level primitives | Semaphore (UCSD-L06)                            | Condition variable (UCSD-L06)        | Mesa vs. Hoare monitors (UCB-L09, Corn-L09, UIUC-L09) |
|                         | Mutex (UCSD-L06)                                | Monitor (UCSD-L06)                   | Monitors and Java (UCSD-L06)                          |
| Deadlock and bugs       | Four conditions for deadlock (Corn-L06)         | Banker's algorithm (UCSD-L08)        |                                                       |
|                         | RAG/Wait-for graph (Corn-L06, UCSD-L08)         | Data race bugs (SJTU-OS-L19)         |                                                       |
|                         | Preventing deadlock (Corn-L06)                  | Happen-before (SJTU-OS-L20)          |                                                       |
|                         | Avoiding deadlock (Corn-L06)                    | Lockset (SJTU-OS-L20)                |                                                       |
|                         | Detecting deadlock (Corn-L06)                   |                                      |                                                       |
|                         | Recovering deadlock (Corn-L06)                  |                                      |                                                       |
| Scalable locking        |                                                 | MCS locks (MIT-L18)                  | Multicore: MESI protocol (MIT-L18)                    |
|                         |                                                 | Transaction memory (Stan-L07)        | Lock-free producer/consumer (Stan-L07)                |
|                         |                                                 |                                      | Non-blocking synchronization (Stan-L07)               |
|                         |                                                 |                                      | Wait-free stack (Stan-L07)                            |
|                         |                                                 |                                      | RCU (Harv-L21)                                        |
|                         |                                                 |                                      | Scalable OS interface (Stan-L07)                      |
| Principles              | Advices for locking (MIT-L09)                   | Locking in practice (Harv-L20)       | 12 commandments of synchronization (Corn-L09)         |

### References

| University   | Year  | Lectures                |
| ------------ | ----- | ----------------------- |
| UCB CS-162   | 2018f | L07, L08, L09           |
| Corn CS-441  | 2018f | L05, L06, L07, L08, L09 |
| MIT 6.033    | 2019s | L04, L15, L17           |
| MIT 6.828    | 2018f | L09, L18                |
| Harv CS-161  | 2018s | L19, L20, L21           |
| Stan CS-140  | 2018w | L03, L07, L08           |
| UCSD CSE-120 | 2018s | L05, L06, L07, L08      |
| UIUC CS-423  | 2018s | L08, L09, L10           |
| WISC CS-537  | 2018s | L06, L07, L08, L09      |
| WU  CSE-451  | 2018f | L09, L13                |

### Big Pictures

**Synchronization Roadmap (UIUC-L08, P12)**

| Layer                     | Technologies                             |
| ------------------------- | ---------------------------------------- |
| Application               | Concurrent Applications                  |
| Shared objects            | Bounded buffer, Barrier                  |
| Synchronization variables | Semaphores, Lock, Condition variables    |
| Atomic instructions       | Interrupt disable, Test-and-set          |
| Hardware                  | Multiple processors, Hardware interrupts |

