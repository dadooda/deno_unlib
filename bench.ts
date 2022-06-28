
/** Benchmark and print milliseconds spent running `fn()` `times` times. */
export async function bench(label: string, times: number, fn: () => unknown) {
  const ms = await took(async () => {
    for (let i = 0; i < times; i++) await fn()
  })
  xd.printFn(`[bench] ${label} x ${times} = ${ms} ms`)
}

/** @return number Milliseconds spent running `fn()` */
export async function took(fn: () => unknown): Promise<number> {
  const startedAt = performance.now()
  await fn()
  return performance.now() - startedAt
}

//-------------------------------------- Testing

interface XD {
  printFn: (...data: unknown[]) => void
}

/** External dependencies. */
export const xd: XD = {
  printFn: console.debug,
}
