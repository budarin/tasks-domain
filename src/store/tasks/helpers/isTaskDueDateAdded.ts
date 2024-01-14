import type { ExtendedTask } from '../../index.ts';

export function isTaskExpireDateAdded(task: ExtendedTask, prevTask: ExtendedTask): boolean {
    return prevTask.expire_date_time === undefined && task.expire_date_time !== undefined;
}
