import type { CreateTaskInput, UpdateTaskInput } from "@/lib/validation";
import { Task } from "@/models/task";

export class TaskNotFoundError extends Error {
  constructor(id: number) {
    super(`Task ${id} not found`);
    this.name = "TaskNotFoundError";
  }
}

export function listTasks() {
  return Task.findAll({
    order: [["createdAt", "DESC"]],
  });
}

export async function getTask(id: number) {
  const task = await Task.findByPk(id);
  if (!task) {
    throw new TaskNotFoundError(id);
  }
  return task;
}

export function createTask(input: CreateTaskInput) {
  return Task.create({
    title: input.title,
    description: input.description ?? null,
    dueDate: input.dueDate ?? null,
  });
}

export async function updateTask(id: number, input: UpdateTaskInput) {
  const task = await getTask(id);

  await task.update({
    ...(input.title !== undefined ? { title: input.title } : {}),
    ...(input.description !== undefined
      ? { description: input.description }
      : {}),
    ...(input.dueDate !== undefined ? { dueDate: input.dueDate } : {}),
    ...(input.done !== undefined ? { done: input.done } : {}),
  });

  return task;
}

export async function deleteTask(id: number) {
  const task = await getTask(id);
  await task.destroy();
}