import { toZonedTime } from "date-fns-tz";

const timeZone = "Asia/Ulaanbaatar";

export const parseIntUlat = (str: string) => {
  return toZonedTime(str, timeZone)
}
