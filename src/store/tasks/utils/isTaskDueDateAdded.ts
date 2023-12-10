import type { ExtendedTask } from '../../index.js';

export function isTaskDueDateAdded(task: ExtendedTask, prevTask: ExtendedTask): boolean {
    return prevTask.due_date_time === undefined && task.due_date_time !== undefined;
}
