import { describe, expect, it } from "vitest";
import { createTaskSchema, updateTaskSchema } from "./validation";

describe("createTaskSchema", () => {
    it("accepts a title only", () => {
        const result = createTaskSchema.safeParse({ title: "Buy milk" });
        expect(result.success).toBe(true);
    });

    it("rejects an empty title", () => {
        const result = createTaskSchema.safeParse({ title: "   " });
        expect(result.success).toBe(false);
    });

    it("rejects a bad due date", () => {
        const result = createTaskSchema.safeParse({
            title: "Ship it",
            dueDate: "tomorrow",
        });
        expect(result.success).toBe(false);
    });

    it("accepts YYYY-MM-DD due dates", () => {
        const result = createTaskSchema.safeParse({
            title: "Ship it",
            dueDate: "2026-09-25",
        });
        expect(result.success).toBe(true);
    });
});

describe("updateTaskSchema", () => {
    it("allows toggling done without a title", () => {
        const result = updateTaskSchema.safeParse({ done: true });
        expect(result.success).toBe(true);
    });

    it("rejects a non-boolean done", () => {
        const result = updateTaskSchema.safeParse({ done: "yes" });
        expect(result.success).toBe(false);
    });
});