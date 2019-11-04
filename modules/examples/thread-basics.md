# Thread Basic Examples

## `thread.h`

`thread.h`: a multi-threaded playground. Just two APIs:

* Function: `void create(void (*fn)())`: create (and immediately start) a new thread which calls `fn`  
* Function: `void join(void (*fn)())`: wait until all threads are terminated and call `fn`

```c
#include <stdlib.h>
#include <stdio.h>
#include <pthread.h>

#define LENGTH(arr) (sizeof(arr) / sizeof(arr[0]))
pthread_t *threads[128];
void (*join_cb)();

// ========== Basics ==========

static void join_all() {
  for (int i = 0; i < LENGTH(threads); i++) {
    pthread_t *t = threads[i];
    if (t) {
      pthread_join(*t, NULL);
      free(t);
    }
  }
  if (join_cb) {
    join_cb();
  }
}

static void *entry_all(void *fn) {
  ((void (*)())fn)();
  return NULL;
}

static void create(void (*fn)()) {
  for (int i = 0; i < LENGTH(threads); i++) {
    if (threads[i] == NULL) {
      if (i == 0) {
        atexit(join_all);
      }
      pthread_t *t = malloc(sizeof(pthread_t));
      threads[i] = t;
      pthread_create(t, NULL, entry_all, fn);
      return;
    }
  }
  fprintf(stderr, "reached maximum threads.\n");
  exit(EXIT_FAILURE);
}

static void join(void (*fn)()) {
  join_cb = fn;
}
```

In later courses, more code is added to `thread.h` (currently not used):

```c
#include <stdint.h>

intptr_t atomic_xchg(volatile intptr_t *addr,
                               intptr_t newval) {
  // swap(*addr, newval);
  intptr_t result;
  asm volatile ("lock xchg %0, %1":
    "+m"(*addr), "=a"(result) : "1"(newval) : "cc");
  return result;
}

intptr_t locked = 0;

static inline void lock() {
  while (1) {
    intptr_t value = atomic_xchg(&locked, 1);
    if (value == 0) {
      break;
    }
  }
}

static inline void unlock() {
  atomic_xchg(&locked, 0);
}

#include <semaphore.h>

#define P sem_wait
#define V sem_post
#define SEM_INIT(sem, val) sem_init(&(sem), 0, val)
```

To use `thread.h`, simply include it in a single-file C code. We also provide a `Makefile`.

## Example: Hello-MT

> Question: how to prove that the threads are indeed concurrently executed? I.e., how to disprove that the system actually calls `fn()`s one after another?

```c
#include <threads.h>

void f() {
  static int x = 0;
  printf("Hello from thread #%c\n", "123456789X"[x++]);
  while (1);
  // to make sure that the system wasn't sequentially calling f() for ten times
}
int main() {
  for (int i = 0; i < 10; i++)
    create(f);
  join(NULL);
}
```

Findings:

1. Threads are indeed concurrent!
2. Threads share memory (`x`). May further prove this by printing the address.
3. Multi-threaded programming is not that hard. (This is an illusion :P) On some computers, may see different threads get a same `x` (race and UB).

## Example: Stack-Probing

> Question: we claimed that threads share memory and found the data is indeed shared. Do threads have non-overlapping stacks? Are they (and should they) in the same address space? What's each thread's stack size?
>
> Additional question: how are thread local (`__thread`) variables implemented?

```c
#include <threads.h>
#include <unistd.h>
#include <sys/syscall.h>

__thread char *base, *now; // thread-local variables

// help to see how thread local variables are implemented
void set_base(char *ptr) { base = ptr; }
void set_now(char *ptr)  { now = ptr; }
void *get_base() { return &base; }
void *get_now() { return &now; }
static inline int tid() { return syscall(SYS_gettid); }

void stackoverflow(int n) {
  char x;
  if (n == 0) set_base(&x);
  set_now(&x);
  if (n % 1024 == 0) {
    printf("[%d] Stack size @ n = %d: %p +%ld KB\n",
      tid(), n, base, (base - now) / 1024);
  }
  stackoverflow(n + 1);
}

void probe() {
  printf("[%d] thread local address %p\n", tid(), &base);
  stackoverflow(0);
}

int main() {
  setbuf(stdout, NULL);
  for (int i = 0; i < 4; i++) {
    create(probe);
  }
  join(NULL);
}
```

```
$ ./stack_probe.out | grep local
[17639] thread local address 0x7f850dd726f8
[17641] thread local address 0x7f850cd706f8
[17642] thread local address 0x7f850c56f6f8
[17640] thread local address 0x7f850d5716f8
$ ./stack_probe.out
...
[17649] Stack size @ n = 173056: 7f35d777beb7 +8112 KB
[17649] Stack size @ n = 174080: 7f35d777beb7 +8160 KB
```

Findings:

1. Thread-locals are indeed thread local (otherwise this program would not work as expected).
2. Stacks are ~8KiB in size by default (RTFM told this).
3. Everything including stacks and thread-locals is in the same address space without overlapping.