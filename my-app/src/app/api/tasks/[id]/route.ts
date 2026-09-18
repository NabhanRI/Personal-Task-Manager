import { NextResponse } from "next/server";
import {
  deleteTask,
  getTask,
  TaskNotFoundError,
  updateTask,
} from "@/lib/task-service";
import { updateTaskSchema } from "@/lib/validation";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function parseId(id: string) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) {
    return null;
  }
  return numericId;
}

function notFound(error: TaskNotFoundError) {
  return NextResponse.json({ error: error.message }, { status: 404 });
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const numericId = parseId(id);
  if (numericId === null) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const task = await getTask(numericId);
    return NextResponse.json(task);
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      return notFound(error);
    }
    throw error;
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const numericId = parseId(id);
  if (numericId === null) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await request.json();
  const parsed = updateTaskSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const task = await updateTask(numericId, parsed.data);
    return NextResponse.json(task);
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      return notFound(error);
    }
    throw error;
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const numericId = parseId(id);
  if (numericId === null) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await deleteTask(numericId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      return notFound(error);
    }
    throw error;
  }
}