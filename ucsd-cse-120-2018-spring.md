# Principles of Computer Operating Systems (Spring 2018)

## Course info

- Instructors: **Geoffrey M. Voelker**
- Textbook: __Operating Systems: Three Easy Pieces__
- URL: http://cseweb.ucsd.edu/classes/sp18/cse120-a/

## Outline

1. Introduction
2. OS architectural support
3. Processes
4. Threads
   - Process and thread comparision
   - Kernel-level vs. user-level threads
   - Nachos thread API
   - Preemptive vs. non-preemptive scheduling
5. Synchronization
   - Race condition: bank accounts
   - Critical section
   - Mutex
   - Atomic read/write
   - Peterson's algorithm
   - Atomic instructions
   - Spinlock
6. Semaphores and monitors (1)
   - Semaphore
   - Readers/writers problem
   - Bounded buffer
7. Semaphores and monitors (2)
   - Monitor
   - Condition variables
   - Interesting example: a bug in Linux driver
8. Scheduling and deadlock
   - FCFS/FIFO
   - SJF
   - Priority scheduling
   - Round robin
   - UNIX scheduler
   - Deadlock
   - Resource allocation graph
   - Banker's algorithm
9. Memory management
10. Paging (1)
11. Paging (2)
12. Page replacement
13. File systems
14. File system implementation
15. Protection
16. Multicore
17. Virtual machine monitors
18. Summary and final review
