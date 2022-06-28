
/**
 * Reusable type guards.
 * @module
 */

export function isArray<T>(x: unknown): x is Array<T> {
  return (isObject(x) && x.constructor.name == "Array")
}

export function isArrayBuffer(x: unknown): x is ArrayBuffer {
  return (isObject(x) && x.constructor.name == "ArrayBuffer")
}

// deno-lint-ignore ban-types
export function isAsyncFunction(x: unknown): x is Function {
  return (isObject(x) && x.constructor.name == "AsyncFunction")
}

export function isBoolean(x: unknown): x is boolean {
  return (isObject(x) && x.constructor.name == "Boolean")
}

export function isFalse(x: unknown): x is false {
  return (isBoolean(x) && x == false)
}

// deno-lint-ignore ban-types
export function isFunction(x: unknown): x is Function {
  return (isObject(x) && (isAsyncFunction(x) || isSyncFunction(x)))
}

export function isNull(x: unknown): x is null {
  // NOTE: We NEED a `===` here, otherwise `undefined` will produce true.
  return (x === null)
}

export function isNumber(x: unknown): x is number {
  return (isObject(x) && x.constructor.name == "Number")
}

// deno-lint-ignore ban-types
export function isObject(x: unknown): x is Object {
  try {
    // deno-lint-ignore ban-types
    return !!(<Object>x).constructor.name
  } catch {
    // `null` and `undefined` will end up here.
    return false
  }
}

export function isString(x: unknown): x is string {
  return (isObject(x) && x.constructor.name == "String")
}

// deno-lint-ignore ban-types
export function isSyncFunction(x: unknown): x is Function {
  return (isObject(x) && x.constructor.name == "Function")
}

export function isTrue(x: unknown): x is true {
  return (isBoolean(x) && x == true)
}

export function isUint8Array(x: unknown): x is Uint8Array {
  return (isObject(x) && x.constructor.name == "Uint8Array")
}

export function isUndefined(x: unknown): x is undefined {
  // NOTE: We NEED a `===`, otherwise `null` will produce true,
  return (x === undefined)
}
