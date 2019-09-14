# Introduction to Operating Systems (Spring 2018)

## Course info

- Instructors: **Remzi Arpaci-Dusseau**
- Textbook: __Operating Systems: Three Easy Pieces__
- URL: http://pages.cs.wisc.edu/~remzi/Classes/537/Spring2018/

## Outline

1. Introduction
2. Scheduling
3. Memory management
4. Paging: TLBs - Smaller
5. Beyond physical
6. Threads - Locks
   - Data race
   - Mutual exclusion
   - Spinlock
   - Atomic instruction
   - Add locks to a list or hash table
7. Locks, CVs
   - Ticket locks
   - yield()
   - park()/unpark()
   - condition variables
   - fork/join problem
   - Producer/consumer problem
8. Semaphores
   - Producer/consumer problem (cont.)
   - Semaphores
9. Deadlock
   - Concurrency bugs
   - Atomicity violation
   - Ordering violation
   - Preventing deadlock
   - Avoiding deadlock
   - Detecting deadlock
   - Recovering deadlock
10. I/O and disks
11. RAID and file systems
12. File system implementation and FFS
13. Journaling
14. LFS and SSD



**Lecture 8:** Remembering producer/consumer (Part 1). Ending producer/consumer, intro to semaphores (Part 2). [Notes.](http://pages.cs.wisc.edu/~remzi/Classes/537/Spring2018/Discussion/note-mar13.pdf)Handouts: [Semaphores.](http://pages.cs.wisc.edu/~remzi/Classes/537/Spring2018/Discussion/Handout-Semaphores.pdf) Video: [Part 1](https://youtu.be/U1LfmL7f1h8) [Part 2](https://youtu.be/cuY8r8RXqAY) [Part 3 (Discussion)](https://youtu.be/WVHRaqom0yo)

**Lecture 9:** Bugs and deadlock (Part 1). Review (Part 2). [Notes.](http://pages.cs.wisc.edu/~remzi/Classes/537/Spring2018/Discussion/note-mar20.pdf) [Part 1](https://youtu.be/Fnp_K63ss44) [Part 2](https://youtu.be/AMG29dlH8t0)