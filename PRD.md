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

## Git & GitHub workflow

`main` is always the stable baseline. Work is **one concern per branch**, opened as a PR, merged (or fixed on that same branch), then the next branch is created from updated `main`.

Do **not** pile the whole app onto one long-lived branch (e.g. `feat/task-manager`).

- Branch naming: `docs/…`, `chore/…`, `feat/…`, `test/…`, `ci/…`
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `ci:`)
- If a PR needs a fix, push to **that** branch until it is mergeable, then start the next feature
- GitHub Actions CI runs on pull requests and on `main`

## Success criteria

- App runs locally and via Docker Compose
- CRUD works end to end in the browser
- Automated tests cover validation, API, and key UI pieces
- GitHub shows a series of small PRs into `main`, not a single dump
- README + this PRD + [PLAN.md](./PLAN.md) are enough for a new engineer to continue
