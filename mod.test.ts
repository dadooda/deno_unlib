
import { assert as a } from "./depsT.ts"

// Touch every module of the set.
import {
  delayIt,        // `async.ts`.
  bench,          // `bench.ts`.
  dc,             // `dc~.ts`.
} from "./mod.ts"

Deno.test(() => {
  a.assertEquals(true, true)
})