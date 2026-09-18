"use client";

import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import type { Task } from "@/lib/types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadTasks() {
    setError(null);
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to load");
      setTasks(await res.json());
    } catch {
      setError("Could not load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreate(input: {
    title: string;
    description?: string;
    dueDate?: string;
  }) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Create failed");
    await loadTasks();
  }

  async function handleToggle(task: Task) {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    });
    await loadTasks();
  }

  async function handleDelete(task: Task) {
    await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    await loadTasks();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-6 py-14">
      <header className="border-b-2 border-border pb-4">
        <p className="text-xs font-bold uppercase tracking-widest">Todo</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
          Personal Task Manager
        </h1>
      </header>
  
      <section className="border-2 border-border bg-accent p-5 shadow-[3px_3px_0_0_var(--border)]">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide">
          Add a task
        </h2>
        <TaskForm onCreate={handleCreate} />
      </section>
  
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-bold uppercase tracking-wide">Your tasks</h2>
        {loading && <p className="text-sm">Loading...</p>}
        {error && (
          <p role="alert" className="border-2 border-border bg-surface px-3 py-2 text-sm font-medium">
            {error}
          </p>
        )}
        {!loading && !error && (
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
      </section>
    </main>
  );
}