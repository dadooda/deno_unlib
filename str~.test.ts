
import { assert as a } from "./depsT.ts"
import * as mod from "./str~.ts"

Deno.test("isBlank(), isPresent()", () => {
  run("", true)
  run(" ", true)
  run(" \t\n ", true)
  run(".", false)
  run("\ta\n", false)
  run("я", false)
})

function run(input: string, expected: boolean) {
  a.assertEquals(mod.isBlank(input), expected)
  a.assertNotEquals(mod.isPresent(input), expected)
}
