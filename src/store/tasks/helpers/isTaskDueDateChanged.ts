import type { ExtendedTask } from '../../index.ts';

export function isTaskExpireDateChanged(task: ExtendedTask, prevTask: ExtendedTask): boolean {
    return prevTask.expire_date_time !== task.expire_date_time;
}
