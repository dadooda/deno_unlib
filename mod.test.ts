
// deno-lint-ignore-file no-unused-vars

// Touch every module of the set. This is the subject of our testing.
import {
  /* async.ts */    delayIt,
  /* bench.ts */    bench,
  /* focus.ts */    focus,
  /* func.ts */     getFuncName,
  /* inspect.ts */  j,
  /* m.ts */        m,
  /* scope.ts */    scope,

  /* dc~.ts */      dc,
  /* guard~.ts */   guard,
  /* str~.ts */     str,
} from "./mod.ts"

// This is fairly formal, just to print the report line.
Deno.test("imports", () => {})
