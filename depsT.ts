
import * as bdd from "https://deno.land/std@0.142.0/testing/bdd.ts"

export * as assert from "https://deno.land/std@0.142.0/testing/asserts.ts"

// BDD. Export both the module and some individual constants.
export { bdd }
export const [ describe, it ] = [ bdd.describe, bdd.it ]
