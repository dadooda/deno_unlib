
import { assert as a } from "./depsT.ts"
import { _, j } from "./inspect.ts"
import { scope } from "./scope.ts"

scope(() => {
  Deno.test("_()", () => {
    run("kk", '"kk"')
    run([ 1.1, "hoy", null, undefined ], '[ 1.1, "hoy", null, undefined ]')
    run({ name: "Joe", age: 25.5 }, '{ name: "Joe", age: 25.5 }')

  })

  const run = (input: unknown, expected: string) => {
    a.assertEquals(_(input), expected)
  }
})

scope(() => {
  Deno.test("j()", () => {
    run("kk", '"kk"')
    run([ 1.1, "hoy", null, undefined ], '[1.1,"hoy",null,null]')
    run({ name: "Joe", age: 25.5 }, '{"name":"Joe","age":25.5}')
  })

  const run = (input: unknown, expected: string) => {
    a.assertEquals(j(input), expected)
  }
})
