import type { ExtendedTask } from '../../index.ts';
import type { Task } from '../../../entities/index.ts';

export function createExtendedTask(task: Task): ExtendedTask {
    const { task_id, title, priority_id, category_id, description, expire_date_time, deleted, completed } = task;

    if (expire_date_time) {
        const timestamp = Date.parse(expire_date_time);
        const date = new Date(timestamp);
        date.setHours(0, 0, 0, 0);
        const date_timestamp = date.getTime();

        return {
            ...task,
            expire_date_time,
            expire_date_ts: date_timestamp,
            expire_date_time_ts: timestamp,
        };
    }

    return {
        task_id,
        title,
        priority_id,
        category_id,
        description,
        deleted,
        completed,
        expire_date_time: undefined,
        expire_date_ts: undefined,
        expire_date_time_ts: undefined,
    };
}
