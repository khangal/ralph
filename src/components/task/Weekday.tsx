import { authClient } from "@/lib/auth-client";
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

  return (
    <div className="space-y-3">
            {/*       {calendarDays.map((day, index) => ( */}
            {/*         <th key={index}> */}
            {/*           <div className="flex flex-col items-center text-center"> */}
            {/*             <span> */}
            {/*               {day.toLocaleDateString("en-US", { month: "short" })} */}
            {/*             </span> */}
            {/*             <span className="text-base-content"> */}
            {/*               {day.toLocaleDateString("en-US", { day: "2-digit" })} */}
            {/*             </span> */}
            {/*             <span> */}
            {/*               {day.toLocaleDateString("en-US", { */}
            {/*                 weekday: "short", */}
            {/*               })} */}
            {/*             </span> */}
            {/*           </div> */}
            {/*         </th> */}
            {/*       ))} */}
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
                  onClick={() => handleToggle(session?.user.id, day.value)}
                  className={`btn btn-circle btn-sm disabled:pointer-events-none ${day.checked ? "btn-primary text-white" : "btn-outline" }`}
                  disabled={session?.user.id === user.id}
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
