
import { b64, bts, hex, str } from "./dcMod.ts"
import { colors as c } from "./deps.ts"
import { assert as a } from "./depsT.ts"
import { scope } from "./scope.ts"

const doIt = () => { // Wrap {{{

scope("b64", (name) => {
  const [ mod, smp ] = [ b64, tSample.b64 ]

  Deno.test(lft(name, "str"), () => {
    eq(mod.from(sample.hello.str), smp.hello)
  })

  Deno.test(rgt(name, "bts"), () => {
    eq(mod.toBts(smp.hello), sample.hello.bts)
  })
})

scope("bts", (name) => {
  const [ mod, smp ] = [ bts, tSample.bts ]

  Deno.test(lft(name, "str"), () => {
    eq(mod.from(sample.hello.str), smp.hello)
  })

  Deno.test(lft(name, "tArrayBuffer"), () => {
    eq(mod.from(sample.hello.tArrayBuffer), smp.hello)
  })
})

scope("hex", (name) => {
  const [ mod, smp ] = [ hex, tSample.hex ]

  Deno.test(lft(name, "str"), () => {
    eq(mod.from(sample.hello.str), smp.hello)
  })

  Deno.test(rgt(name, "bts"), () => {
    eq(mod.toBts(smp.hello), sample.hello.bts)
  })
})

scope("str", (name) => {
  const [ mod, smp ] = [ str, tSample.str ]

  Deno.test(lft(name, "bts"), () => {
    eq(mod.from(sample.hello.bts), smp.hello)
  })
})

} // Wrap }}}

//-------------------------------------- Service

const eq = a.assertEquals

interface All {
  [key: string]: unknown
  b64: string
  hex: string
  bts: Uint8Array
  str: string
  tArrayBuffer: ArrayBuffer   // Type-based, not a "format".
}

// NOTE: Loading constants requires a wrapper around the main part.

// Samples, human-friendly.
const sample = {
  a123: <All>{
    b64: "MTIz",
    hex: "313233",
    bts: new Uint8Array([ 0x31, 0x32, 0x33 ]),
    str: "123",
    tArrayBuffer: <unknown>null,
  },

  hello: <All>{
    b64: "SGVsbG8sINC80LjRgNGKIQ==",
    hex: "48656c6c6f2c20d0bcd0b8d180d18a21",
    bts: new Uint8Array([ 72, 101, 108, 108, 111, 44,  32, 208, 188, 208, 184, 209, 128, 209, 138, 33 ]),
    str: "Hello, миръ!",
    tArrayBuffer: <unknown>null,
  },
}

// Post-fill.
sample.a123.tArrayBuffer = sample.a123.bts.buffer
sample.hello.tArrayBuffer = sample.hello.bts.buffer

// Samples, per type.
const tSample = {
  b64: {
    a123: sample.a123.b64,
    hello: sample.hello.b64,
  },

  bts: {
    a123: sample.a123.bts,
    hello: sample.hello.bts,
  },

  hex: {
    a123: sample.a123.hex,
    hello: sample.hello.hex,
  },

  str: {
    a123: sample.a123.str,
    hello: sample.hello.str,
  },
}

/** Format as `"${n1} ← ${n2}"`. */
function lft(n1: string, n2: string): string {
  return n1 + c.brightCyan(" ← ") + n2
}

/** Format as `"${n1} → ${n2}"`. */
function rgt(n1: string, n2: string): string {
  return n1 + c.brightCyan(" → ") + n2
}

//-------------------------------------- Go!

doIt()
