#include <stdlib.h>
#include <stdint.h>

// Code is only for exposition (e.g., doesn't deal with instruction re-ordering by compiler)

#define CACHELINE 64
struct lock {
  // t-s and t-s-exp
  volatile unsigned int locked;

  // ticket
  volatile unsigned int next_ticket;
  volatile int now_serving;
};

static inline unsigned int
TestAndSet(volatile unsigned int *addr)
{
  unsigned int result;
  unsigned int new = 1;
  
  // x86 atomic exchange.
  asm volatile("lock; xchgl %0, %1" :
               "+m" (*addr), "=a" (result) :
               "1" (new) :
               "cc");
  return result;
}


/*
 * Test-and-Set
 */
void
t_s_acquire(struct lock *lock)
{
  while(TestAndSet(&lock->locked) == 1)
    ;
}

void
t_s_release(struct lock *lock)
{
  lock->locked = 0;
}

/*
 * Atomically increment *p and return
 * the previous value.
 */
static __inline unsigned int
ReadAndIncrement(volatile unsigned int *p)
{ 
    int v = 1;
    __asm __volatile (
    "   lock; xaddl   %0, %1 ;    "
    : "+r" (v),
      "=m" (*p)
    : "m" (*p));
 
    return (v);
}


/*
 * Ticket Lock 
 */
void
ticket_acquire(struct lock *lock)
{
  int me = ReadAndIncrement(&lock->next_ticket);
  while(lock->now_serving != me)
    ;
}

void
ticket_release(struct lock *lock)
{
  lock->now_serving += 1;
}


/*
 * MCS locks
 */

struct qnode {
    volatile void *next;
    volatile char locked;
    char __pad[0] __attribute__((aligned(CACHELINE)));
};

typedef struct {
    struct qnode *v  __attribute__((aligned(64)));
    int lock_idx  __attribute__((aligned(64)));
} mcslock_t;

static inline long xchg(long *ptr, long val)
{
        __asm__ volatile(
                "lock; xchgq %0, %1\n\t"
                : "+m" (*ptr), "+r" (val)
                :
                : "memory", "cc");
        return val;
}

static inline long cmpxchg(long *ptr, long old, long val)
{
    uint64_t out;
    __asm__ volatile(
                "lock; cmpxchgq %2, %1"
                : "=a" (out), "+m" (*ptr)
                : "q" (val), "0"(old)
                : "memory");

    return out;
}

static inline void
mcs_init(mcslock_t *l)
{
        l->v = NULL;
}

static inline void
mcs_lock(mcslock_t *l, volatile struct qnode *mynode)
{
        struct qnode *predecessor;

        mynode->next = NULL;
        predecessor = (struct qnode *)xchg((long *)&l->v, (long)mynode);

        if (predecessor) {
                mynode->locked = 1;
		asm volatile("":::"memory");
                predecessor->next = mynode;
                while (mynode->locked)
                        __asm __volatile("pause");
        }
}

static inline void
mcs_unlock(mcslock_t *l, volatile struct qnode *mynode)
{
        if (!mynode->next) {
                if (cmpxchg((long *)&l->v, (long)mynode, 0) == (long)mynode)
                        return;
                while (!mynode->next)
		  __asm __volatile("pause");               
        }
        ((struct qnode *)mynode->next)->locked = 0;
}
