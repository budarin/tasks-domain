import type { Id } from '../types.ts';

export type TaskId = Id;
export type TaskTitle = string;
export type TaskPriorityId = Id;
export type TaskCategoryId = Id | undefined;
export type TaskDescription = string | undefined;
export type TaskDueDateTime = string | undefined;
export type TaskDeleted = boolean | undefined;
export type TaskCompleted = boolean | undefined;

export type NewTask = {
    title: TaskTitle;
    priority_id: TaskPriorityId;
    category_id?: TaskCategoryId;
    description?: TaskDescription;
    due_date_time?: TaskDueDateTime;
    deleted?: TaskDeleted;
    completed?: TaskCompleted;
};

export type Task = {
    task_id: TaskId;
} & NewTask;
