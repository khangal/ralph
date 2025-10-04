import { Challenge } from "@/contexts/challenge/types"

export const challengeMapper = (challenge: Challenge) => {
  return {
    ...challenge,
    visibility: challenge.visibility === 1 ? "public" : "private",
  }
}
