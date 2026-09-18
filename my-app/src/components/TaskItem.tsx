"use client";

import type { Task } from "@/lib/types";

type TaskItemProps = {
    task: Task;
    onToggle: (task: Task) => void;
    onDelete: (task: Task) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    return (
        <li
            className={
                task.done
                    ? "flex items-start justify-between gap-3 border-2 border-border bg-muted p-3 shadow-[3px_3px_0_0_var(--border)]"
                    : "flex items-start justify-between gap-3 border-2 border-border bg-surface p-3 shadow-[3px_3px_0_0_var(--border)]"
            }
        >
            <label className="flex flex-1 items-start gap-3">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggle(task)}
                    aria-label={`Mark "${task.title}" as ${task.done ? "not done" : "done"}`}
                    className="mt-1 size-4 accent-foreground"
                />
                <span className="flex flex-col">
                    <span
                        className={
                            task.done
                                ? "font-bold line-through opacity-50"
                                : "font-bold"
                        }
                    >
                        {task.title}
                    </span>
                    {task.description && (
                        <span className="text-sm opacity-70">{task.description}</span>
                    )}
                    {task.dueDate && (
                        <span className="mt-1 text-xs font-medium uppercase tracking-wide opacity-60">
                            Due {task.dueDate}
                        </span>
                    )}
                </span>
            </label>
            <button
                type="button"
                onClick={() => onDelete(task)}
                aria-label={`Delete "${task.title}"`}
                className="border-2 border-border bg-surface px-2 py-1 text-xs font-bold uppercase hover:bg-foreground hover:text-background"
            >
                Delete
            </button>
        </li>
    );
}