
/** Check if string is blank. */
export function isBlank(s: string): boolean {
  return s.trim() == ""
}

/** Check if string is present, i.e. not blank. */
export function isPresent(s: string): boolean {
  return !isBlank(s)
}
