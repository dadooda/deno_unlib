
import { assert as a, it } from "./depsT.ts"
import * as g from "./guard~.ts"

it("guards", () => {
  expect(sample.Array, { isArray: 1, isObject: 1})
  expect(sample.ArrayBuffer, { isArrayBuffer: 1, isObject: 1 })
  expect(sample.AsyncFunction, { isAsyncFunction: 1, isFunction: 1, isObject: 1 })
  expect(sample.Object, { isObject: 1 })
  expect(sample.SyncFunction, { isFunction: 1, isObject: 1, isSyncFunction: 1 })
  expect(sample.Uint8Array, { isObject: 1, isUint8Array: 1 })

  expect(sample.integer, { isInteger: 1, isNumber: 1, isObject: 1 })
  expect(sample.number, { isNumber: 1, isObject: 1 })
  expect(sample.string, { isObject: 1, isString: 1 })

  expect(sample.vEmptyString, { isObject: 1, isString: 1 })
  expect(sample.vFalse, { isBoolean: 1, isFalse: 1, isObject: 1 })
  expect(sample.vInstance, { isObject: 1 })
  expect(sample.vNull, { isNull: 1 })
  expect(sample.vTrue, { isBoolean: 1, isObject: 1, isTrue: 1 })
  expect(sample.vUndefined, { isUndefined: 1 })
})

//-------------------------------------- Service

interface Result {
  isArray?: 1
  isArrayBuffer?: 1
  isAsyncFunction?: 1
  isBoolean?: 1
  isFalse?: 1
  isFunction?: 1
  isInteger?: 1
  isNull?: 1
  isNumber?: 1
  isObject?: 1
  isString?: 1
  isSyncFunction?: 1
  isTrue?: 1
  isUint8Array?: 1
  isUndefined?: 1
}

class Klass {}

const sample = {
  Array: [],
  ArrayBuffer: (new Uint8Array([ 1, 2, 3 ])).buffer,
  // deno-lint-ignore require-await
  AsyncFunction: async () => 4,
  Object: {},
  SyncFunction: () => 5,
  Uint8Array: new Uint8Array([ 6, 7, 8 ]),

  integer: 1,
  number: 1.1,
  string: "lala",

  vEmptyString: "",
  vFalse: false,
  vInstance: new Klass,
  vNull: null,
  vTrue: true,
  vUndefined: undefined,
}

function expect(value: Parameters<typeof recognize>[0], res: Result) {
  a.assertEquals(recognize(value), res)
}

function recognize(x: unknown): Result {
  const res: Result = {}

  if (g.isArray(x)) res.isArray = 1
  if (g.isArrayBuffer(x)) res.isArrayBuffer = 1
  if (g.isAsyncFunction(x)) res.isAsyncFunction = 1
  if (g.isBoolean(x)) res.isBoolean = 1
  if (g.isFalse(x)) res.isFalse = 1
  if (g.isFunction(x)) res.isFunction = 1
  if (g.isInteger(x)) res.isInteger = 1
  if (g.isNull(x)) res.isNull = 1
  if (g.isNumber(x)) res.isNumber = 1
  if (g.isObject(x)) res.isObject = 1
  if (g.isString(x)) res.isString = 1
  if (g.isSyncFunction(x)) res.isSyncFunction = 1
  if (g.isTrue(x)) res.isTrue = 1
  if (g.isUint8Array(x)) res.isUint8Array = 1
  if (g.isUndefined(x)) res.isUndefined = 1

  return res
}
