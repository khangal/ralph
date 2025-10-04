export const CompletionTBodyPrivate = ({
  calendarDays,
  checked,
  handleChange,
  completions,
  currentUser,
}: {
  completions: { userId: string; completedAt: string }[] | undefined;
  calendarDays: Date[];
  checked: Record<string, boolean>;
  handleChange: (userId: string, date: Date) => void;
  currentUser: { id: string; name: string; image?: string | null };
}) => {
  return (
    <tbody>
      <tr>
        {completions &&
          calendarDays.map((day, index) => {
            return (
              <td key={`${index}-${day.toISOString()}`} className="text-center">
                <label>
                  <input
                    type="checkbox"
                    className="checkbox disabled:opacity-100 disabled:cursor-not-allowed"
                    checked={checked[`${currentUser.id}-${day.toISOString()}`] || false}
                    onChange={() => handleChange(currentUser.id, day)}
                  />
                </label>
              </td>
            );
          })}
      </tr>
    </tbody>
  )
};
