
/** Inspect a value as JSON. */
export const j = JSON.stringify

/** Inspect a value in human-readable form. */
export function _(value: unknown) {
  return Deno.inspect(value, { depth: 10, trailingComma: true })
}
