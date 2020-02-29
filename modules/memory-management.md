## Memory Management

### Prerequisite Modules

- Architecture support for OS
- Process and thread

### Module Syllabus

|                           | Basic                                                  | Detailed                                            | Advanced                                          |
| ------------------------- | ------------------------------------------------------ | --------------------------------------------------- | ------------------------------------------------- |
| Memory multiplexing       | Virtual memory goals (Stan-L05)                        | Kernel address space (UCSD-L09)                     |                                                   |
|                           | Virtual address space                                  |                                                     |                                                   |
| Base and bounds           | Base and bounds (UCB-L12, UCSD-L09)                    |                                                     |                                                   |
| Segmentation              | Segmentation (Stan-L05)                                |                                                     |                                                   |
| Demand paging             | Page table (UCB-L13)                                   | PTE of x86 (Stan-L05)                               | Reverse page mapping (UCB-L15, Corn-L07)          |
|                           | Page swapping (Corn-L08)                               | 64-bit address space (Stan-L06)                     | Software-TLB on MIPS and DEC (Corn-L08, Stan-L05) |
|                           | Page sharing (UCB-L13, UCSD-L10)                       | Superpages (Stan-L06)                               |                                                   |
|                           | Page fault (UCB-L14)                                   | Mapped files (UCSD-L10)                             |                                                   |
|                           | Copy-on-write (Corn-L07, UCSD-10)                      |                                                     |                                                   |
| TLB                       | TLB (UCB-L13, UIUC-L15)                                | Overlapping TLB & cache access (UCB-L14)            |                                                   |
| Caching                   | Locality (UCB-L13)                                     | Associative cache (UCB-L13)                         |                                                   |
| Page replacement policies | FIFO, MIN, LRU, MRU, LFU (UCB-L15, Corn-L08, Stan-L06) | Clock algorithm (UCB-L15, Stan-L06)                 |                                                   |
|                           | Belady's Anomaly (Corn-L08, UCSD-L11, UIUC-L17)        | Second-chance list algorithm (UCB-L15)              |                                                   |
| Thrashing                 | Thrashing (UCB-L15, Stan-L06)                          | Two-level scheduler (Stan-L06)                      |                                                   |
| Memory allocation         | Fragmentation (Stan-L09)                               | Fixed/priority allocation (UCB-L15)                 | Slab allocator (UCB-L15, Stan-L09)                |
|                           | First fit, best fit, etc.(Stan-L09)                    | Page-fault frequency allocation (UCB-L15, UCSD-L11) | Exploiting program behavior (Stan-L09)            |
| Case study                |                                                        | mmap, sync, mprotect (Stan-L06)                     | 4.4 BSD VM system (Stan-L06)                      |
| No-MMU alternatives       |                                                        |                                                     | Language-level protection (Java) (Stan-L05)       |
|                           |                                                        |                                                     | SFI like NaCl (Stan-L05)                          |
| Garbage collection        |                                                        |                                                     | Heap overflow detection (Stan-L09)                |
|                           |                                                        |                                                     | Reference counting (Stan-L09)                     |
| Distributed shared memory |                                                        |                                                     | DSM (Stan-L09)                                    |

### References

| University   | Year  | Lectures           |
| ------------ | ----- | ------------------ |
| UCB CS-162   | 2018f | L12, L13, L14, L15 |
| Corn CS-441  | 2018f | L07, L08           |
| Stan CS-140  | 2018w | L05, L06, L08      |
| UCSD CSE-120 | 2018s | L09, L10, L11      |
| UIUC CS-423  | 2018s | L14, L15, L16, L17 |



