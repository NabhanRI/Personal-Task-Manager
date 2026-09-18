import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "@/lib/db";

export interface TaskAttributes {
  id: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type TaskCreation = Optional<
  TaskAttributes,
  "id" | "description" | "dueDate" | "done" | "createdAt" | "updatedAt"
>;

export class Task
  extends Model<TaskAttributes, TaskCreation>
  implements TaskAttributes
{
  declare id: number;
  declare title: string;
  declare description: string | null;
  declare dueDate: string | null;
  declare done: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    modelName: "Task",
  }
);