import { db } from "@/db";
import { groups } from "@/db/schema";
import { first } from "@/db/utils";

export type Group = typeof groups.$inferSelect;
export type InsertGroup = typeof groups.$inferInsert;

export const createGroup = async (params: InsertGroup) => {
  return first(await db.insert(groups).values(params).returning());
}
