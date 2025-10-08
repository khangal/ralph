import { toZonedTime, format } from "date-fns-tz";

const timeZone = "Etc/UTC"

export const parseIntUtc = (str: string) => {
  return toZonedTime(str, timeZone)
}

export const toDateString = (date: Date) => {
  return format(date, "yyyy-MM-dd", { timeZone })
}
