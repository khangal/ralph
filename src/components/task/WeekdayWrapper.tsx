import { Weekday } from "./Weekday";

export const WeekdayWrapper = ({
  user,
  handleToggle,
  days,
}: {
  user: { id: string; name: string; image?: string | null };
  days: { value: Date; checked: boolean }[];
  handleToggle: (userId: string, date: Date) => void;
}) => {
  return (
    <Weekday days={days} handleToggle={handleToggle} user={user} />
  );
};
