import ChallengeForm from "@/components/challenge/ChallengeForm"

export default function NewChallengePage () {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <ChallengeForm action="create" />
    </div>
  )
}
