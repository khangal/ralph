import { ChallengeFront } from "@/contexts/challenge/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ChallengeInput = {
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
};

async function createChallenge(data: ChallengeInput): Promise<ChallengeFront> {
  const res = await fetch("/api/challenge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create challenge");
  }

  return res.json();
}

export function useCreateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChallenge,
    onSuccess: () => {
    // 🔄 Invalidate or update cached challenges
    queryClient.invalidateQueries({ queryKey: ["challenges"] });

    // or optimistically update:
    // queryClient.setQueryData<Challenge[]>(["challenges"], (old) =>
    //   old ? [...old, newChallenge] : [newChallenge]
    // );
    },
  });
}
