import { db } from "@/db";
import { completions, user } from "@/db/schema";
import { toDateString } from "@/lib/time";
import { desc, eq } from "drizzle-orm";

export type LogFront = {
  id: string;
  userId: string;
  challengeId: string;
  userName: string
  completedAt: string;
  createdAt: string;
  date: string
}

export const findLogsByChallengeId = async (challengeId: string) => {
  const result = await db
    .select({
      id: completions.id,
      userId: completions.userId,
      challengeId: completions.challengeId,
      completedAt: completions.completedAt,
      createdAt: completions.createdAt,
    })
    .from(completions)
    .where(eq(completions.challengeId, challengeId))
    .orderBy(desc(completions.createdAt));

  return result.map(log => ({
    ...log,
    date: toDateString(log.completedAt)
  }))
};

