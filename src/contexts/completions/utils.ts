import { toDateString } from "@/lib/time";

type CompletionDistilled = {
  id: number;
  userId: string;
  challengeId: string;
  completedAt: Date;
}

export const completionMapper = (completion: CompletionDistilled) => {
  return {
    id: completion.id,
    userId: completion.userId,
    challengeId: completion.challengeId,
    completedAt: toDateString(completion.completedAt),
  }
}
