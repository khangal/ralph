import { ChallengeFront } from "@/contexts/challenge/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CompleteChallengeInput = {
  challengeId: string;
  date?: Date;
  currentValue: "on" | "off";
};

const formatDate = (date: Date) => {
  return date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
}

async function toggleChallenge(
  data: CompleteChallengeInput,
): Promise<ChallengeFront> {
  const dateParam = data.date ? formatDate(data.date) : formatDate(new Date());

  const params = {
    ...data,
    date: dateParam,
  };

  if (data.currentValue === "off") {
    const res = await fetch(`/api/challenge/${data.challengeId}/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error("Failed to create challenge");
    }

    return res.json();
  } else {
    const res = await fetch(
      `/api/challenge/${data.challengeId}/completions/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      },
    );

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
    onSuccess: () => {
      // TODO: Just update cache without invalidating query
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      queryClient.invalidateQueries({ queryKey: ["day-completions"] });
    },
  });
}
