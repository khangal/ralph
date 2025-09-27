"use client"


export default function ChallengePage() {
  // Static data
  const challenge = { title: "30-Day Fitness Challenge" };
  const startDate = "2025-09-01";
  const endDate = "2025-09-30";
  const attendees = [
    { 
      id: 1, 
      name: "Alice", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=56&h=56&q=80",
      completions: [true, false, true, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true]
    },
    { 
      id: 2, 
      name: "Bob", 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=56&h=56&q=80",
      completions: [true, true, false, true, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]
    },
    { 
      id: 3, 
      name: "Charlie", 
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dca8515?ixlib=rb-4.0.3&auto=format&fit=crop&w=56&h=56&q=80",
      completions: [false, true, true, false, true, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true]
    },
  ];
  const challenges = [
    { id: 1, title: "30-Day Fitness Challenge" },
    { id: 2, title: "Daily Meditation Challenge" },
    { id: 3, title: "Coding Streak Challenge" },
  ];
  const logs = [
    { date: new Date("2025-09-01"), user: { name: "Alice" } },
    { date: new Date("2025-09-01"), user: { name: "Bob" } },
    { date: new Date("2025-09-02"), user: { name: "Bob" } },
    { date: new Date("2025-09-02"), user: { name: "Charlie" } },
    { date: new Date("2025-09-03"), user: { name: "Alice" } },
  ];

  // Generate calendar days from startDate to endDate
  const calendarDays = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);
  while (currentDate <= end) {
    calendarDays.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-orange-400 bg-clip-text text-transparent drop-shadow-lg text-center">
        {challenge.title}
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-2">
          <label className="font-semibold text-blue-700">Start Date:</label>
          <input
            type="date"
            defaultValue={startDate}
            className="rounded-lg border-gray-300 px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            disabled
          />
          <label className="font-semibold text-orange-700">End Date:</label>
          <input
            type="date"
            defaultValue={endDate}
            className="rounded-lg border-gray-300 px-2 py-1 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            disabled
          />
          <button
            className="rounded-full bg-gradient-to-r from-blue-400 to-orange-400 text-white font-semibold py-2 px-4 shadow transition hover:scale-105"
            disabled
          >
            Show
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-blue-700 mb-2 mt-6">Attendees</h3>
      <div className="flex gap-4 flex-wrap justify-center mb-6">
        {attendees.map((user) => (
          <div key={user.id} className="flex flex-col items-center">
            <img
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              className="w-14 h-14 rounded-full border-4 border-blue-200 shadow-md mb-1 bg-white object-cover"
            />
            <span className="text-sm text-gray-700 font-medium">{user.name}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold text-orange-700 mb-2">Progress Calendar</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-xl shadow border border-gray-200">
          <thead>
            <tr>
              <th className="px-2 py-1 text-xs font-semibold text-gray-600 bg-blue-50 rounded-tl-xl">User</th>
              {calendarDays.map((day, index) => (
                <th
                  key={index}
                  className={`px-2 py-1 text-xs font-semibold text-gray-600 bg-blue-50 ${
index === calendarDays.length - 1 ? "rounded-tr-xl" : ""
}`}
                >
                  {day.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendees.map((user, userIndex) => (
              <tr key={userIndex}>
                <td className="px-2 py-2">
                  <img
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    className="w-10 h-10 rounded-full border-2 border-blue-200 object-cover"
                  />
                </td>
                {user.completions.map((completed, dayIndex) => (
                  <td
                    key={dayIndex}
                    className={`px-2 py-2 text-center text-lg`}>
                    {completed ? "🔥" : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold text-green-700 mb-2 mt-6">Detailed Log</h3>
      <ul className="bg-white rounded-xl shadow p-4">
        {logs.map((log, index) => (
          <li key={index} className="text-sm text-gray-700 mb-1">
            <span className="font-semibold text-blue-600">
              {log.date.toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" })}
            </span>
            : <span className="font-semibold text-orange-600">{log.user.name}</span> completed the challenge
          </li>
        ))}
      </ul>
    </div>
  );
}
