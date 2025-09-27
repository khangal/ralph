import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ChallengeInput = {
  title: string;
  description: string;
};

export type Challenge = ChallengeInput & {
  id: string;
  createdAt: string;
  // add other fields returned by backend
};

async function createChallenge(data: ChallengeInput): Promise<Challenge> {
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
    onSuccess: (newChallenge) => {
      // 🔄 Invalidate or update cached challenges
      queryClient.invalidateQueries({ queryKey: ["challenges"] });

      // or optimistically update:
      // queryClient.setQueryData<Challenge[]>(["challenges"], (old) =>
      //   old ? [...old, newChallenge] : [newChallenge]
      // );
    },
  });
}
