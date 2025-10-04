import { db } from "@/db";
import { CreateChallenge } from "./types";
import { challenges, user } from "@/db/schema";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import { firstOrNull } from "@/db/utils";

export const findPrivateChallenges = async (userId: string) => {
  return await db
    .select({
      ...getTableColumns(challenges),
    })
    .from(challenges)
    .where(and(eq(challenges.ownerId, userId), eq(challenges.visibility, 2)))
    .orderBy(desc(challenges.createdAt));
};

export const findPublicChallenges = async () => {
  return await db
    .select({
      ...getTableColumns(challenges),
      owner: user.name,
      ownerImage: user.image,
    })
    .from(challenges)
    .where(eq(challenges.visibility, 1))
    .innerJoin(user, eq(challenges.ownerId, user.id))
    .orderBy(desc(challenges.createdAt));
};

export const createChallenge = (params: CreateChallenge) => {
  return db.insert(challenges).values(params);
};

export const updateChallenge = async (
  id: number,
  params: Partial<CreateChallenge>,
) => {
  return firstOrNull(
    await db
      .update(challenges)
      .set(params)
      .where(eq(challenges.id, id))
      .returning(),
  );
};

export const findChallenge = async (id: number) => {
  return firstOrNull(
    await db.select().from(challenges).where(eq(challenges.id, id)),
  );
};
