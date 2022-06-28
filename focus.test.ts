
import { assert as a } from "./depsT.ts"
import { focus } from "./focus.ts"

Deno.test("focus()", () => {
  clear()
  focus(() => add(10), () => add(20), () => add(30))
  expect()

  clear()
  focus(() => add(10), () => add(20), () => add(30), 99)
  expect()

  clear()
  focus(() => add(10), () => add(20), () => add(30), 99)
  expect()

  clear()
  focus(() => add(10), 1, () => add(20), () => add(30))
  expect(20)

  clear()
  focus(99, () => add(10), () => add(20), () => add(30))
  expect(10, 20, 30)
})

//-------------------------------------- Service

let accu: unknown[] = []

function add(...args: unknown[]) {
  accu.push(...args)
}

function clear() {
  accu = []
}

function expect(...expected: unknown[]) {
  a.assertEquals(accu, expected)
}