
import { delayIt } from "./async.ts"
import { assert as a } from "./depsT.ts"

Deno.test("delayIt()", async () => {
  const [ delay, margin ] = [ 20, 5 ]

  let x = "hoy"
  const startedAt = performance.now()
  await delayIt(delay, () => { x = "vey" })
  const diff = performance.now() - startedAt
  a.assert(diff >= delay, `diff >= delay`)
  a.assert(diff < delay + margin, `diff < ${delay + margin}`)
  a.assertEquals(x, "vey")
})
