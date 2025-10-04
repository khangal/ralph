import { challenges } from "@/db/schema";

export type Challenge = typeof challenges.$inferSelect;
export type ChallengeFront = Omit<Challenge, "visibility"> & {
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
  visibility: "public" | "private";
};
export type ChallengeFrontWithOwner = ChallengeFront & {
  owner: string;
  ownerImage: string;
};
export type CreateChallenge = typeof challenges.$inferInsert;
