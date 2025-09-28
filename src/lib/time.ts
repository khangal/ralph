import { toZonedTime, format } from "date-fns-tz";

const timeZone = "Asia/Ulaanbaatar";

export const parseIntUlat = (str: string) => {
  return toZonedTime(str, timeZone)
}

export const formatToUlatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd", { timeZone })
}
