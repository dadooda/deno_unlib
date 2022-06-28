
// deno-lint-ignore-file no-unused-vars

// Touch every module of the set. This is the subject of our testing.
import {
  delayIt,            // `async.ts`.
  bench,              // `bench.ts`.
  focus,              // `focus.ts`.
  getFuncName,        // `func.ts`.
  j,                  // `inspect.ts`.
  m,                  // `m.ts`.
  scope,              // `scope.ts`.

  dc,                 // `dc~.ts`.
  guard,              // `guard~.ts`.
  str,                // `str~.ts`.
} from "./mod.ts"

// This is fairly formal, just to print the report line.
Deno.test("imports", () => {})
