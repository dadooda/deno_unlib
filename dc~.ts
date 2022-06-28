
// deno-lint-ignore-file no-namespace prefer-namespace-keyword

import { base64 as base64Mod, hex as hexMod } from "./deps.ts"
import * as g from "./guard~.ts"

/**
 * Yet another attempt to build a confusion-free Deno data conversion library.
 *
 * Each "format" is a pre-defined convention, using underlying type and presentation.
 * The following "formats" are supported:
 *
 * * "b64" -- a string containing Base64 representation.
 * * "bts" -- bytes, an Uint8Array.
 * * "hex" -- a string containing hex representation.
 * * "str" -- an UTF-8 string.
 *
 * @module
 */

export module b64 {
  export function from(input: string): string {
    return base64Mod.encode(input)
  }

  export function toBts(input: string): Uint8Array {
    return base64Mod.decode(input)
  }
}

export module bts {
  export function from(input: ArrayBuffer | string): Uint8Array {
    if (g.isArrayBuffer(input)) return new Uint8Array(input)
    else return te.encode(input)
  }
}

export module hex {
  export function from(input: ArrayBuffer | Uint8Array | string): string {
    const inputAsBts = g.isArrayBuffer(input) ? bts.from(input)
      : (g.isString(input) ? te.encode(input) : input)
    return td.decode(hexMod.encode(inputAsBts))
  }

  export function toBts(input: string): Uint8Array {
    return hexMod.decode(te.encode(input))
  }
}

export module str {
  export function from(input: Uint8Array): string {
    return td.decode(input)
  }
}

//-------------------------------------- Service

const [ td, te ] = [ new TextDecoder(), new TextEncoder() ]
