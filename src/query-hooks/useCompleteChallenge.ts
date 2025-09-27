import { ChallengeFront } from "@/contexts/challenge/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CompleteChallengeInput = {
  challengeId: string;
  date: string;
  currentValue: "on" | "off";
};

async function toggleChallenge(data: CompleteChallengeInput): Promise<ChallengeFront> {
  if (data.currentValue === "off") {
    const res = await fetch(`/api/challenge/${data.challengeId}/completions`, {
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
  } else {
    const res = await fetch(`/api/challenge/${data.challengeId}/completions/delete`, {
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
}

export function useToggleChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleChallenge,
    onSuccess: (newChallenge) => {
      // 🔄 Invalidate or update cached challenges
      // queryClient.invalidateQueries({ queryKey: ["challenges"] });

      // or optimistically update:
      // queryClient.setQueryData<Challenge[]>(["challenges"], (old) =>
      //   old ? [...old, newChallenge] : [newChallenge]
      // );
    },
  });
}
