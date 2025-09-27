export const firstOrNull = <T>(input: T[]): T | null => {
  return input[0] || null
}

export const first = <T>(input: T[]): T => {
  return input[0]
}

export const firstOrThrow = <T>(input: T[]): T => {
  if (!input[0]) {
    throw new Error("No results found")
  }

  return input[0]
}

export const getCount = (input: { count: number }[]): number => {
  return input[0].count
}
