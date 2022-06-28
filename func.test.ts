
import { assert as a } from "./depsT.ts"
import { getFuncName } from "./func.ts"

Deno.test("getFuncName()", () => {
  a.assertEquals(hoy(), "hoy!")
  a.assertEquals(vey(), "hoy!")
})

function hoy(): string {
  return getFuncName("!")
}

function vey(): string {
  return hoy()
}
