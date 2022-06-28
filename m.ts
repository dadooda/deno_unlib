
import { colors as c } from "./deps.ts"

/**
 * Print debug messages.
 * @module
 */

interface HasPrompt {
  PROMPT: symbol
  (...args: unknown[]): void
}

/**
 * Pass this as an argument to `m()` in order to wait for line input.
 *
 * @see m()
 * @example
 *
 * ```ts
 * m("name", name, PROMPT)    // Output "name", then wait for line.
 * m("name", name, m.PROMPT)  // Same as above, but allows us to omit importing `PROMPT`.
 * ```
 */
export const PROMPT = Symbol("PROMPT")

/**
 * Print a debug message.
 *
 * @example
 *
 * ```ts
 * m("name", name)
 * m("name", name, m.PROMPT)
 * ```
 */
export const m = <HasPrompt>function(...args: unknown[]): void {
  let accu: unknown[] = []

  // Wait for PROMPT.
  for (const arg of args) {
    if (arg !== PROMPT) {   // "!==" is important to ensure type-safe comparison for modules, etc.
      accu.push(arg)
      continue
    }

    // Found a PROMPT.

    // Print accumulated, if any.
    if (accu.length > 0) {
      xd.printFn(...accu)
      accu = []
    }

    // Handle prompt.
    xd.promptFn(c.bold(c.yellow("Press ENTER ") + c.red(">") + c.green(">") + c.blue(">")))
  }

  if (accu.length > 0) xd.printFn(...accu)
}

m.PROMPT = PROMPT

/**
 * Make `m()` which prints the first string argument with a prefix.
 *
 * @deprecated
 * @see m()
 * @see mkM()
 * @example
 *
 * ```ts
 * const m = mkPrefixedM("main(): ")
 * ```
 */
export function mkPrefixedM(pfx: string, fnM?: (...args: unknown[]) => void) {
  return mkM((s) => `${pfx}${s}`, fnM)
}

/**
 * Make a custom `m()` which wraps the first string argument with a callback.
 *
 * @see m()
 * @see mkPrefixedM()
 * @example
 *
 * ```ts
 * const m = mkM((s) => colors.cyan(s))
 * ```
 */
export function mkM(wrap: (message: string) => string, fnM?: (...args: unknown[]) => void): HasPrompt {
  const out = (...args: unknown[]): void => {
    let pass: unknown[]

    if (args.length < 1 || typeof(args[0]) != "string") pass = args
    else pass = [ wrap(args[0]), ...args.slice(1) ]

    fnM ? fnM(...pass) : m(...pass)
  }

  out.PROMPT = PROMPT

  return out
}

/** @deprecated */
export const mkWrappedM = mkM

/**
 * Suppress all debug messages.
 *
 * @example
 *
 * ```ts
 * import { mMute as m } from "./m.ts"
 * m("name", name)    // Nothing gets printed.
 * ```
 */
export const mMute = <HasPrompt>function(..._args: unknown[]): void {}

mMute.PROMPT = PROMPT

//-------------------------------------- Testing

interface XD {
  printFn: (...data: unknown[]) => void
  promptFn: (message: string) => void
}

/** External dependencies. */
export const xd: XD = {
  printFn: console.debug,
  promptFn: prompt,
}
