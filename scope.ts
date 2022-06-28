
import * as g from "./guard~.ts"

export async function scope(fn: () => void): Promise<void>;
export async function scope<T>(param: T, fn: (param: T) => void): Promise<void>;
export async function scope<T>(fnOrParam: (() => void) | T, fn?: (param: T) => void): Promise<void> {
  if (g.isFunction(fnOrParam)) {
    await fnOrParam()
  } else {
    await fn!(fnOrParam)
  }
}

//
// Implementation notes:
//
// * Repetitive function types like `() => void` produce better live hints in VS code.
//   Usage of types is also possible, but in this case it would add confusion on the caller end.
