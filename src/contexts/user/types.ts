import { user } from "@/db/schema";

export type User = typeof user.$inferSelect;
export type CreateUser = typeof user.$inferInsert;
