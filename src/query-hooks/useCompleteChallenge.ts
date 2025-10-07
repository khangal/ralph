import { ChallengeFront } from "@/contexts/challenge/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CompleteChallengeInput = {
  challengeId: string;
  date?: Date;
  currentValue: "on" | "off";
};

const formatDate = (date: Date) => {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};

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
      throw new Error("Failed to delete challenge completion");
    }

    return res.json();
  }
}

export function useToggleChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleChallenge,
    // Optimistic update
    onMutate: async (newData: CompleteChallengeInput) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ["day-completions"] });

      // Snapshot the previous state
      const previousDayCompletions = queryClient.getQueryData(["day-completions"]);

      queryClient.setQueryData(["day-completions"], (old: string[] | undefined) => {
        if (!old) return old;
        const date = formatDate(newData.date || new Date());
        return newData.currentValue === "off"
          ? [...old, `${newData.challengeId}:${date}`]
          : old.filter((item) => item !== `${newData.challengeId}:${date}`);
      });

      // Return context with previous state for rollback
      return { previousDayCompletions };
    },
    // On success, no need to invalidate since the cache is already updated
    onSuccess: () => {
      // Optionally, you can refetch to ensure sync with server
      // queryClient.invalidateQueries({ queryKey: ["logs"] });
      // queryClient.invalidateQueries({ queryKey: ["day-completions"] });
    },
    // On error, rollback to previous state
    onError: (_err, _newData, context) => {
      // queryClient.setQueryData(["logs"], context?.previousLogs);
      queryClient.setQueryData(["day-completions"], context?.previousDayCompletions);
    },
    // Always refetch after error or success to ensure consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      queryClient.invalidateQueries({ queryKey: ["day-completions"] });
    },
  });
}
