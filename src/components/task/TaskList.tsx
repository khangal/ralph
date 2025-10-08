import { useToggleChallenge } from "@/query-hooks/useCompleteChallenge";
import { useDayCompletions } from "@/query-hooks/useTasks";
import React, { useState } from "react";
import { format, subDays, addDays, isSameDay, startOfDay } from "date-fns";
import { toDateString } from "@/lib/time";

type Task = {
  challengeId: number;
  text: string;
};

type TaskWithStatus = Task & {
  completed: boolean;
};

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { mutateAsync: toggle } = useToggleChallenge();
  const { data: completions, isLoading } = useDayCompletions(
    toDateString(currentDate),
  );

  const tasksWithStatus = (tasks || []).map((task) => ({
    ...task,
    completed:
      completions?.some(
        (completion) => completion.challengeId === task.challengeId.toString(),
      ) || false,
  }));

  const toggleTask = async (task: TaskWithStatus) => {
    await toggle({
      challengeId: task.challengeId.toString(),
      currentValue: task.completed ? "on" : "off",
      date: toDateString(currentDate),
    });
  };

  const handlePreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const getWeekdayAndStatus = (date: Date) => {
    const today = startOfDay(new Date()); // Normalize to start of day
    const selectedDate = startOfDay(date);
    const weekday = format(date, "EEEE"); // e.g., "Wednesday"
    let status = "";

    if (isSameDay(selectedDate, today)) {
      status = "Today";
    } else if (isSameDay(selectedDate, subDays(today, 1))) {
      status = "Yesterday";
    }

    return { weekday, status };
  };

  const { weekday, status } = getWeekdayAndStatus(currentDate);

  return (
    <div className="card bg-base-200 max-w-md mx-auto">
      <div className="card-header p-6 border-b flex items-center justify-between">
        <button
          className="p-3 rounded-full group relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={handlePreviousDay}
          aria-label="Navigate to previous day"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handlePreviousDay();
            }
          }}
        >
          <div className="absolute inset-0 rounded-full bg-base-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6 text-base-content/70 group-hover:text-base-content transition-colors duration-200 relative"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div className="flex flex-col items-center flex-1">
          <span className="card-title text-xl font-semibold text-center">
            {toDateString(currentDate)}
          </span>
          <span className="text-sm text-base-content/70 mt-1">
            {weekday}
            {status ? `, ${status}` : ""}
          </span>
        </div>

        <button
          className="p-3 rounded-full group relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={handleNextDay}
          aria-label="Navigate to previous day"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleNextDay();
            }
          }}
        >
          <div className="absolute inset-0 rounded-full bg-base-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6 text-base-content/70 group-hover:text-base-content transition-colors duration-200 relative"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className="card-body p-4">
        <div className="divide-y divide-base-300">
          {isLoading
            ? tasksWithStatus.map((_, i) => (
              <div
                key={i}
                className="flex items-center w-full py-2 px-4 rounded-xl animate-pulse"
              >
                <div className="skeleton w-8 h-8 rounded mr-4" /> {/* matches checkbox-lg */}
                <div className="skeleton h-7 w-2/3 rounded" /> {/* closer to text height */}
              </div>
            ))
            : tasksWithStatus.map((task) => (
              <label
                key={task.challengeId}
                className={`
flex items-center w-full cursor-pointer select-none text-lg 
transition-colors duration-150 
hover:bg-base-100 rounded-xl
py-2 px-4
`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                  className="checkbox checkbox-lg mr-4"
                />
                <span
                  className={task.completed ? "line-through text-gray-400" : ""}
                >
                  {task.text}
                </span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
