
/** Perform an asynchronous delay with an optional callback. */
export function delayIt(delay: number, fn?: () => unknown): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (fn) fn()
        resolve()
      } catch (e) {
        reject(e)
      }
    }, delay)
  })
}

/** Pause async execution forever. */
export function forever(): Promise<void> {
  return new Promise(() => {})
}
