import type { ExtendedTask } from '../../index.js';

export function isTaskCategoryChanged(task: ExtendedTask, prevTask: ExtendedTask): boolean {
    return prevTask.category_id !== task.category_id;
}
