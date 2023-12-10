import type { ExtendedTask } from '../../index.js';

export function isTaskCategoryDeleted(task: ExtendedTask, prevTask: ExtendedTask): boolean {
    return prevTask.category_id !== undefined && task.category_id === undefined;
}