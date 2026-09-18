"use client";

import { useState } from "react";

type TaskFormProps = {
    onCreate: (input: {
        title: string;
        description?: string;
        dueDate?: string;
    }) => Promise<void>;
};

export default function TaskForm({ onCreate }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);

        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        setSubmitting(true);
        try {
            await onCreate({
                title: title.trim(),
                description: description.trim() || undefined,
                dueDate: dueDate || undefined,
            });
            setTitle("");
            setDescription("");
            setDueDate("");
        } catch {
            setError("Could not create task");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                aria-label="Title"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 border-border bg-surface px-3 py-2 outline-none focus:bg-background"
            />
            <textarea
                aria-label="Description"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-2 border-border bg-surface px-3 py-2 outline-none focus:bg-background"
            />
            <input
                aria-label="Due date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border-2 border-border bg-surface px-3 py-2 outline-none focus:bg-background"
            />
            {error && (
                <p role="alert" className="text-sm font-medium">
                    {error}
                </p>
            )}
            <button
                type="submit"
                disabled={submitting}
                className="border-2 border-border bg-foreground px-4 py-2 font-bold text-background shadow-[3px_3px_0_0_var(--border)] transition-transform hover:translate-x-px hover:translate-y-px disabled:opacity-50"
            >
                {submitting ? "Adding..." : "Add task"}
            </button>
        </form>
    );
}