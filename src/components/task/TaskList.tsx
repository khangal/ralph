import { useToggleChallenge } from "@/query-hooks/useCompleteChallenge";
import { useDayCompletions } from "@/query-hooks/useTasks";
import React from "react";

type Task = {
  challengeId: number;
  text: string;
}

type TaskWithStatus = Task & {
  completed: boolean;
}

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const { mutateAsync: toggle } = useToggleChallenge();
  const { data: completions } = useDayCompletions();

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
    });
  };

  return (
    <div className="card bg-base-200 max-w-sm mx-auto">
      <div className="card-header p-4 border-b">
        <h2 className="card-title">Today&apos;s tasks</h2>
      </div>
      <div className="card-body p-4">
        {tasksWithStatus.map((task) => (
          <label
            key={task.challengeId}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
              className="checkbox checkbox-sm"
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
  );
};

export default TaskList;
