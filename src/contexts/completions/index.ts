import { db } from "@/db";
import { completions } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export type CreateCompletion = typeof completions.$inferInsert;
export type Completion = typeof completions.$inferSelect;
export type CompletionFront = typeof completions.$inferSelect & {
  completedAt: string;
  createdAt: string;
  updatedAt: string;
};

export const findCompletionsByChallengeId = async (challengeId: string) => {
  const result = await db
    .select({
      id: completions.id,
      userId: completions.userId,
      challengeId: completions.challengeId,
      // name: user.name,
      // image: user.image,
      completedAt: completions.completedAt,
    })
    .from(completions)
    // .innerJoin(user, eq(user.id, completions.userId))
    .where(eq(completions.challengeId, challengeId));
  // .orderBy(desc(completions.completedAt), desc(completions.createdAt));

  return result;
};

export const createCompletion = (params: CreateCompletion) => {
  return db.insert(completions).values(params);
};

export const deleteCompletion = (params: CreateCompletion) => {
  return db
    .delete(completions)
    .where(
      and(
        eq(completions.userId, params.userId),
        eq(completions.challengeId, params.challengeId),
        eq(completions.completedAt, params.completedAt),
      ),
    );
};
