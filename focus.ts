
/**
 * Focus or defocus execution of selected code blocks, defined as functions.
 * A number before the block sets the number of consecutive blocks to be enabled (focused).
 *
 * @example
 *
 * ```ts
 * console.log("Wan"); console.log("Tew"); console.log("Free")
 * // => "Wan\nTew\nFree"
 *
 * focus(() => console.log("Wan"), 1, () => console.log("Tew"), () => console.log("Free"))
 * // => "Tew"
 *
 * focus(99, () => console.log("Wan"), () => console.log("Tew"), () => console.log("Free"))
 * // "One\nTew\nFree"
 * ```
 */
export function focus(...blocks: ((() => unknown) | number)[]) {
  let nAllowed = 0

  for (const block of blocks) {
    if (typeof block == "number") {
      nAllowed = block
    } else {
      if (nAllowed > 0) {
        block()
        nAllowed--
      }
    }
  }
}
