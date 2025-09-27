import Link from "next/link";
import { Countdown } from "./Countdown";
import { cn } from "@/lib/utils";

export const ChallengeListingItem = ({
  id,
  title,
  description,
  owner,
  startAt,
  endAt,
  className
}: {
  id: number;
  title: string;
  description: string;
  owner?: string;
  startAt?: string;
  endAt?: string;
  className?: string;
}) => {
  return (
    <Link
      href={`/challenge/${id}`}
      className={cn("card bg-base-200", className)}
    >
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-lg">{title}</div>
            <div className="text-md opacity-70">by {owner}</div>
          </div>
        </div>
        <p className="text-md opacity-80 mt-2 line-clamp-3">{description}</p>

          { startAt && endAt && <Countdown start={startAt} end={endAt} />}
      </div>
    </Link>
  )
}
