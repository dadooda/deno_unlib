
/** Get caller function name. */
export function getFuncName(suffix = ""): string {
  return (new Error()).stack!.split(/^\s+ at\s+/m)![2].split(/\s+/)[0] + suffix
}
