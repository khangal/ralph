import { startOfDay, endOfDay } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";

const timeZone = "Asia/Ulaanbaatar";

export const parseIntUlat = (str: string) => {
  return toZonedTime(str, timeZone)
}

export const formatToUlatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd", { timeZone })
}

export const startOfDayUlat = (date: Date) => {
  return toZonedTime(startOfDay(date), timeZone)
}

export const endOfDayUlat = (date: Date) => {
  return toZonedTime(endOfDay(date), timeZone)
}
