import type { ExtendedTask } from '../../index.ts';

export function isTaskDueDateDeleted(task: ExtendedTask, prevTask: ExtendedTask): boolean {
    return prevTask.due_date_time !== undefined && task.due_date_time === undefined;
}
