import { ChallengeFront } from "@/contexts/challenge/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateChallenge = {
  id: number;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
};

async function updateChallenge(data: UpdateChallenge): Promise<ChallengeFront> {
  const { id, ...updateData } = data;
  const res = await fetch(`/api/challenge/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    throw new Error("Failed to create challenge");
  }

  return res.json();
}

export function useUpdateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateChallenge,
    onSuccess: (updatedChallenge) => {
      // 🔄 Update single challenge cache
      queryClient.setQueryData<ChallengeFront>(
        ["challenge", String(updatedChallenge.id)],
        updatedChallenge
      );

      // 🔄 Update challenge list cache
      queryClient.setQueryData<ChallengeFront[]>(["challenges", "private-challenges"], (old) => {
        return old
            ? old.map((c) =>
                c.id === updatedChallenge.id ? updatedChallenge : c
              )
            : [updatedChallenge]
      });
    },
  });
}
