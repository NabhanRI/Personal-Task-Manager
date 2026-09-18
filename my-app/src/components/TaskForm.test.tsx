import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  it("shows an error when title is empty", () => {
    const onCreate = vi.fn();
    render(<TaskForm onCreate={onCreate} />);

    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByRole("alert")).toHaveTextContent("Title is required");
    expect(onCreate).not.toHaveBeenCalled();
  });

  it("calls onCreate with the title", async () => {
    const onCreate = vi.fn().mockResolvedValue(undefined);
    render(<TaskForm onCreate={onCreate} />);

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Buy milk" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    await vi.waitFor(() => {
      expect(onCreate).toHaveBeenCalledWith({
        title: "Buy milk",
        description: undefined,
        dueDate: undefined,
      });
    });
  });
});