import { challenges } from "@/db/schema"

export type Challenge = typeof challenges.$inferSelect
export type ChallengeFront = Challenge & { startAt: string, endAt: string, createdAt: string, updatedAt: string }
export type ChallengeFrontWithOwner = ChallengeFront & { owner: string, ownerImage: string }
export type CreateChallenge = typeof challenges.$inferInsert
