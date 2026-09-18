export type Task = {
    id: number;
    title: string;
    description: string | null;
    dueDate: string | null;
    done: boolean;
    createdAt: string;
    updatedAt: string;
  };