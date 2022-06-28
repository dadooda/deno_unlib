
File naming
===========

Unlib is a collection of diverse and mostly unrelated modules.
For sake of clarity, modules have different filenames based on the *recommended* way of importing them on the caller side.

1. Modules of type 1 export uniquely named separate constants. Their files have regular names: `async.ts`, `m.ts`, etc.
2. Modules of type 2 export logically grouped constants. Their files have a tilde suffix in their name: `dc~.ts`, `guard~.ts`, etc.
3. `mod.ts` exports constants from type 1 modules like this: `export * from "./async.ts"`.
4. `mod.ts` exports constants from type 2 modules like this: `export * as dc from "./dc~.ts"`.

Thus, `mod.ts` presents a *recommended* way of importing constants of a particular module.
