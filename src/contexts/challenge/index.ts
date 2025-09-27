import { db } from "@/db";
import { CreateChallenge } from "./types";
import { challenges } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { firstOrNull } from "@/db/utils";

export const findChallenges = async () => {
  return await db.select().from(challenges).orderBy(desc(challenges.createdAt));
};

export const createChallenge = (params: CreateChallenge) => {
  return db.insert(challenges).values(params);
};

export const findChallenge = async (id: number) => {
  return firstOrNull(
    await db.select().from(challenges).where(eq(challenges.id, id)),
  );
};
