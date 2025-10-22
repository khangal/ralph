import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const Weekday = ({
  user,
  handleToggle,
  days
}: {
  handleToggle: (userId: string, date: Date) => void;
  user: { id: string; name: string; image?: string | null };
  days: { value: Date, checked: boolean }[];
}) => {
  const { data: session } = authClient.useSession()

  const handleClick = (date: Date) => {
    if (session?.user.id) {
      handleToggle(session.user.id, date);
    }
  }

  return (
    <div className="space-y-3">
      {
        session?.user.id && (
          <div className="flex gap-2 items-center w-full">
            <div className="avatar">
                <div className="w-10 rounded-full">
                  <Image
                    width="30"
                    height="30"
                    src={user.image || ""}
                    alt={user.name}
                  />
                </div>
              </div>
            <div className="flex gap-2 flex-wrap">
              {days.map((day, dayIdx) => (
                <button
                  key={dayIdx}
                  onClick={() => handleClick(day.value)}
                  className={cn(`btn btn-circle btn-sm no-disabled-color`, day.checked ? "btn-primary text-white" : "btn-outline")}
                  aria-disabled={day.checked}
                  disabled={session.user.id !== user.id}
                >
                  {day.value.getDate()}
                </button>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
};
