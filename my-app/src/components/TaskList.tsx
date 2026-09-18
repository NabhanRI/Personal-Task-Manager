"use client";

import type { Task } from "@/lib/types";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-sm text-zinc-500">No tasks yet. Add one above.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}