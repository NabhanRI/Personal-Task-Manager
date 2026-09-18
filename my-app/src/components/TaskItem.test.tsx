import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TaskItem from "./TaskItem";
import type { Task } from "@/lib/types";

const task: Task = {
  id: 1,
  title: "Write README",
  description: "docs",
  dueDate: "2026-09-22",
  done: false,
  createdAt: "2026-09-18T00:00:00.000Z",
  updatedAt: "2026-09-18T00:00:00.000Z",
};

describe("TaskItem", () => {
  it("calls onToggle when the checkbox is clicked", () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    render(<TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />);

    fireEvent.click(screen.getByRole("checkbox"));

    expect(onToggle).toHaveBeenCalledWith(task);
  });

  it("calls onDelete when Delete is clicked", () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    render(<TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />);

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(onDelete).toHaveBeenCalledWith(task);
  });
});