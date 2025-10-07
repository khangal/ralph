import { ChallengeFront } from "@/contexts/challenge/types";
import { CompletionFront } from "@/contexts/completions";
import { customDateFormat } from "@/lib/time";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CompleteChallengeInput = {
  challengeId: string;
  date: string;
  currentValue: "on" | "off";
};

async function toggleChallenge(
  data: CompleteChallengeInput,
): Promise<ChallengeFront> {
  const params = {
    ...data,
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
      const previousDayCompletions = queryClient.getQueryData([
        "day-completions",
        newData.date,
      ]);

      queryClient.setQueryData(
        ["day-completions", newData.date],
        (old: CompletionFront[] | undefined) => {
          if (!old) return old;

          if (newData.currentValue === "off") {
            // Add new completion
            return [
              ...old,
              {
                id: "temp-id", // Temporary ID, replace with real one from server if needed
                userId: "current-user", // Replace with actual current user ID if available
                challengeId: newData.challengeId,
                completedAt: newData.date ? new Date(newData.date) : new Date(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ];
          } else {
            // Remove completion
            return old.filter(
              (completion) =>
                !(
                  completion.challengeId === newData.challengeId &&
                  customDateFormat(new Date(completion.completedAt)) ===
                    (newData.date
                      ? customDateFormat(new Date(newData.date))
                      : customDateFormat(new Date()))
                ),
            );
          }
        },
      );

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
      queryClient.setQueryData(
        ["day-completions"],
        context?.previousDayCompletions,
      );
    },
    // Always refetch after error or success to ensure consistency
    onSettled: (_, __, input) => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      queryClient.invalidateQueries({
        queryKey: ["day-completions", input.date],
      });
    },
  });
}
