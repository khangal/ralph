"use client"

import ChallengeForm from "@/components/challenge/ChallengeForm"
import { useChallenge } from "@/query-hooks/useChallenge"
import { useParams } from "next/navigation";

export default function NewChallengePage () {
  const params = useParams();
  const { data: challenge } = useChallenge(params.id as string);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {
        challenge && (
          <ChallengeForm challenge={challenge} action="edit"  />
        )
      }
    </div>
  )
}
