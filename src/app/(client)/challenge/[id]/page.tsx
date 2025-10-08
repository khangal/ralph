"use client";

import PencilEdit from "@/components/icons/pencil-edit";
import { authClient } from "@/lib/auth-client";
import { useChallenge } from "@/query-hooks/useChallenge";
import { useToggleChallenge } from "@/query-hooks/useCompleteChallenge";
import { useCompletions } from "@/query-hooks/useCompletions";
import { useLogs } from "@/query-hooks/useLogs";
import { useUsers } from "@/query-hooks/useUsers";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CompletionTBody } from "@/components/challenge/completions/CompletionTBody";
import { CompletionTBodyPrivate } from "@/components/challenge/completions/CompletionTBodyPrivate";
import { toDateString } from "@/lib/time";

export default function ChallengePage() {
  const params = useParams();
  const challengeId = params.id as string;

  const { data } = authClient.useSession();

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const { data: challenge } = useChallenge(challengeId);
  const { data: completions } = useCompletions(challengeId);
  const { data: logs } = useLogs(challengeId);
  const { data: participants } = useUsers();
  const { mutateAsync: toggle } = useToggleChallenge();

  useEffect(() => {
    if (!completions) return;

    const completionsMapped = completions.reduce(
      (acc, curr) => {
        const key = `${curr.userId}-${curr.completedAt}`;
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    setChecked(completionsMapped);
  }, [completions]);

  if (!challenge) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleChange = async (userId: string, date: Date) => {
    const key = `${userId}-${toDateString(date)}`;

    // toggle state
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    await toggle({
      currentValue: checked[key] ? "on" : "off",
      challengeId,
      date: toDateString(date)
    });
  };

  // Generate calendar days from startDate to endDate
  const calendarDays: Date[] = [];
  const currentDate = new Date(challenge.startAt);
  const end = new Date(challenge.endAt);

  while (currentDate <= end) {
    calendarDays.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return (
    challenge && (
      <div className="flex flex-col gap-6 pt-6 relative">
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          <div>
            <div className="text-center mx-auto max-w-xl">
              <h1 className="text-3xl font-bold">{challenge.title}</h1>

              <p className="text-sm opacity-70 my-2">{challenge.description}</p>

              <p className="text-sm opacity-70">
                {currentDate.toDateString()} - {end.toDateString()}
              </p>
            </div>

            <Link
              href={`/challenge/${challengeId}/edit`}
              className="absolute top-0 right-0 lg:p-4 p-2"
            >
              <PencilEdit size={32} />
            </Link>
          </div>

          {/* Progress Calendar */}
          <div className="overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  {challenge.visibility === "public" && (
                    <th className="bg-base-100 z-100"></th>
                  )}
                  {calendarDays.map((day, index) => (
                    <th key={index}>
                      <div className="flex flex-col items-center text-center">
                        <span>
                          {day.toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="text-base-content">
                          {day.toLocaleDateString("en-US", { day: "2-digit" })}
                        </span>
                        <span>
                          {day.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {data?.user &&
                (challenge.visibility === "public" ? (
                  <CompletionTBody
                    calendarDays={calendarDays}
                    participants={participants || []}
                    checked={checked}
                    handleChange={handleChange}
                    completions={completions}
                    currentUser={data.user}
                  />
                ) : (
                    <CompletionTBodyPrivate
                      calendarDays={calendarDays}
                      checked={checked}
                      handleChange={handleChange}
                      completions={completions}
                      currentUser={data.user}
                    />
                  ))}

            </table>
          </div>
        </div>

        <div className="divider">Timeline</div>
        {/* <div className="divider">TODO: until real timeline implemented use completions</div> */}
        <div>
          {logs && logs.length > 0 ? (
            <ul className="timeline timeline-vertical">
              {logs.map((log, index) => (
                <li key={`log-${index}`}>
                  {index > 0 && <hr />}
                  <div className="timeline-start text-sm">
                    {format(log.createdAt, "yyyy-MM-dd HH:mm:ss")}
                  </div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box">
                    <span className="font-semibold text-primary">
                      {log.userName}
                    </span>{" "}
                    <span className="text-base-content/70">
                      completed <span className="font-bold">{log.date}</span>
                    </span>
                  </div>
                  {index < logs.length - 1 && <hr />}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No logs available.</p>
          )}
        </div>
      </div>
    )
  );
}
