import type { ExtendedTask } from '../../index.js';
import type { Task } from '../../../entities/index.ts';

export function createExtendedTask(task: Task): ExtendedTask {
    const { task_id, title, priority_id, category_id, description, due_date_time, deleted, completed } = task;

    if (due_date_time) {
        const timestamp = Date.parse(due_date_time);
        const date = new Date(timestamp);
        const date_timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDay()).valueOf();

        return {
            ...task,
            due_date_time,
            due_date_ts: date_timestamp,
            due_date_time_ts: timestamp,
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
        due_date_time: undefined,
        due_date_ts: undefined,
        due_date_time_ts: undefined,
    };
}
