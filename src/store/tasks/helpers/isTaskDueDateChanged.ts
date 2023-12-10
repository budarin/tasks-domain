import type { ExtendedTask } from '../../index.ts';

export function isTaskDueDateChanged(task: ExtendedTask, prevTask: ExtendedTask): boolean {
    return prevTask.due_date_time !== task.due_date_time;
}
