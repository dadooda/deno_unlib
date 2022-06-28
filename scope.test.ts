
import { delayIt } from "./async.ts"
import { assert as a } from "./depsT.ts"
import { scope } from "./scope.ts"

Deno.test("scope()", () => {
  let v = 10
  scope(() => { v = 20 })
  eq(v, 20)

  let l = "hoy"
  scope("vey", (label) => { l = label })
  eq(l, "vey")

  let n = 10
  scope(20, (v) => { n = v })
  eq(n, 20)
})

Deno.test("scope() async operation", async () => {
  let accu: string[] = []
  const clear = () => { accu = [] }

  clear()
  await scope(async () => { await delayIt(6, () => accu.push("1")) })
  accu.push("a")
  await scope(async () => { await delayIt(4, () => accu.push("2")) })
  accu.push("b")
  await scope(async () => { await delayIt(2, () => accu.push("3")) })
  eq(accu, [ "1", "a", "2", "b", "3" ])

  clear()
  await scope("lala", async () => { await delayIt(6, () => accu.push("4")) })
  accu.push("c")
  await scope("lala", async () => { await delayIt(4, () => accu.push("5")) })
  accu.push("d")
  await scope("lala", async () => { await delayIt(2, () => accu.push("6")) })
  eq(accu, [ "4", "c", "5", "d", "6" ])

  // NOTE: Protect against expiring timers. Let tests fail rather than crash with a "Test case is leaking" core message.
  await delayIt(30)
})

//-------------------------------------- Service

const eq = a.assertEquals
