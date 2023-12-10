import type { ExtendedTask } from '../../index.ts';

export function isTaskCategoryAdded(task: ExtendedTask, prevTask: ExtendedTask): boolean {
    return prevTask.category_id === undefined && task.category_id !== undefined;
}
