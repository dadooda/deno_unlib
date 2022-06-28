
import * as dummy from "./_dummy~.ts"
import { assert as a } from "./depsT.ts"
import { m, mkM, mkPrefixedM, mMute, mXd, PROMPT } from "./m.ts"
import { scope } from "./scope.ts"

//-------------------------------------- Config

mXd.printFn = (...args) => accu.push([ T, ...args ])
mXd.promptFn = (...args) => accu.push([ P, ...args ])

//-------------------------------------- Tests

Deno.test("m()", () => {
  m()
  expect([])

  clear()
  m("wan", 2, 3.0)
  m("tew")
  expect([
    [ T, "wan", 2, 3.0 ],
    [ T, "tew" ],
  ])

  clear()
  m(PROMPT)
  expect([
    [ P, prompt ],
  ])

  clear()
  m(m.PROMPT)
  expect([
    [ P, prompt ],
  ])

  clear()
  m(PROMPT, PROMPT)
  expect([
    [ P, prompt ],
    [ P, prompt ],
  ])

  clear()
  m(PROMPT, "hoy")
  expect([
    [ P, prompt ],
    [ T, "hoy" ],
  ])

  clear()
  m("hoy", PROMPT)
  expect([
    [ T, "hoy" ],
    [ P, prompt ],
  ])

  clear()
  m("hoy", PROMPT, "vey")
  expect([
    [ T, "hoy" ],
    [ P, prompt ],
    [ T, "vey" ],
  ])

  clear()
  m("dummy", dummy)
  expect([
    [ T, "dummy", dummy ],
  ])
})

Deno.test("mkPrefixedM()", () => {
  // OPTIMIZE: Use Deno's BDD.
  scope(() => {
    const m = mkPrefixedM("plain(): ")

    clear()
    m("phore", 5)
    m("phive")
    m(99)
    m([ 10 ], "hey")
    expect([
      [ T, "plain(): phore", 5 ],
      [ T, "plain(): phive" ],
      [ T, 99 ],
      [ T, [ 10 ], "hey" ],
    ])
  })

  scope(() => {
    const m = mkPrefixedM("fu(): ", _alsoM)

    clear()
    m("phore", 5)
    m("phive")
    m(99)
    m([ 10 ], "hey")
    expect([
      [ T, "fu(): phore", 5 ],
      [ T, "fu(): phive" ],
      [ T, 99 ],
      [ T, [ 10 ], "hey" ],
    ])

    clear()
    m("ziks", PROMPT)
    expect([
      [ T, "fu(): ziks" ],
      [ P, prompt ],
    ])
  })
})

Deno.test("mkM()", () => {
  scope(() => {
    const m = mkM((s) => `[a]${s}[z]`)

    clear()
    m("phore", 5)
    m("phive")
    m(99)
    m(m.PROMPT)
    m([ 10 ], "hey")
    expect([
      [ T, "[a]phore[z]", 5 ],
      [ T, "[a]phive[z]" ],
      [ T, 99 ],
      [ P, prompt ],
      [ T, [ 10 ], "hey"],
    ])
  })
})

Deno.test("mMute()", () => {
  const m = mMute

  clear()
  m("wan", 2, 3.0)
  m("tew")
  expect([])

  clear()
  m(PROMPT, "hoy")
  expect([])

  clear()
  m(m.PROMPT, "hoy")
  expect([])
})

//-------------------------------------- Service

const _alsoM = m

const P = Symbol("P")   // A prompt element.
const T = Symbol("T")   // A text element.

let accu: unknown[] = []

// OPTIMIZE: Tests related to this fail if the OS console is configured to be color-less.

const prompt = "\x1b[1m\x1b[33mPress ENTER \x1b[39m\x1b[31m>\x1b[39m\x1b[32m>\x1b[39m\x1b[34m>\x1b[39m\x1b[22m"

function clear() {
  accu = []
}

function expect(value: unknown[]) {
  a.assertEquals(accu, value)
}
