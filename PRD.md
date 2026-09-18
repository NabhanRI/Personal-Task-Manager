# Product Requirements — Personal Task Manager

## Goal

A simple, single-user personal task manager that another engineer could pick up and continue.

Built for the DevOps / AI-assisted coding assessment:

- AI-assisted development (Cursor)
- Proper Git & GitHub workflow
- Runnable with Docker
- Automated testing
- Enough documentation to hand off

Timebox: 6 hours.

## Users

A single person managing their own tasks. No accounts, no login.

## Scope

Task fields:

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Non-empty string |
| `description` | no | Text |
| `dueDate` | no | Date |
| `done` | no | Boolean, default `false` |
| `createdAt` / `updatedAt` | auto | Managed by the database |

Operations:

- Create a task
- List tasks (newest first; done tasks visually distinct)
- Toggle done / undone
- Edit a task
- Delete a task

## User stories

- As a user, I can add a task with a title, optional description, and optional due date.
- As a user, I can see all my tasks, newest first, with done ones visually distinct.
- As a user, I can mark a task done or undone, edit it, and delete it.

## Non-goals

Out of scope for this timebox:

- Authentication / multi-user
- Tags, categories, priority
- Search / filters beyond the basic list
- Notifications / reminders

## Success criteria

- App runs locally and via Docker Compose
- CRUD works end to end in the browser
- Automated tests cover validation, API, and key UI pieces
- README + this PRD + [PLAN.md](./PLAN.md) are enough for a new engineer to continue
