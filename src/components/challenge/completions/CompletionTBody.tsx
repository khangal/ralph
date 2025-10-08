import { User } from "@/contexts/user/types";
import { toDateString } from "@/lib/time";
import Image from "next/image";

export const CompletionTBody = ({
  calendarDays,
  participants,
  checked,
  handleChange,
  completions,
  currentUser,
}: {
  completions: { userId: string; completedAt: string }[] | undefined;
  calendarDays: Date[];
  participants: User[];
  checked: Record<string, boolean>;
  handleChange: (userId: string, date: Date) => void;
  currentUser: { id: string; name: string; image?: string | null };
}) => {
  return (
    <tbody>
      {(participants || [])
        .sort((a, b) => {
          if (a.id === currentUser.id) return -1;
          if (b.id === currentUser.id) return 1;
          return 0;
        })
        .map((user) => (
          <tr key={user.id}>
            <th className="bg-base-100 z-100">
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
            </th>

            {completions &&
              calendarDays.map((day, index) => {
                return (
                  <td
                    key={`${index}-${toDateString(day)}`}
                    className="text-center"
                  >
                      {toDateString(day)}
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox disabled:opacity-100 disabled:cursor-not-allowed"
                        disabled={user.id !== currentUser.id}
                        checked={
                          checked[
                            `${user.id}-${toDateString(day)}`
                          ] || false
                        }
                        onChange={() => handleChange(user.id, day)}
                      />
                    </label>
                  </td>
                );
              })}
          </tr>
        ))}
    </tbody>
  )
}
