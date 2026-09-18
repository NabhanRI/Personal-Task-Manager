import { NextResponse } from "next/server";
import { createTask, listTasks } from "@/lib/task-service";
import { createTaskSchema } from "@/lib/validation";

export async function GET() {
  const tasks = await listTasks();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createTaskSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const task = await createTask(parsed.data);
  return NextResponse.json(task, { status: 201 });
}