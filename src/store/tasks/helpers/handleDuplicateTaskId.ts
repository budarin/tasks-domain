import type { ResultOrError } from '@budarin/validate.ts';
import type { Task } from '../../../entities/index.js';

export function handleDuplicateTaskId(task: Task): ResultOrError<Task> {
    const ERROR_MSG = 'Добавление дубликата задачи';

    return {
        error: {
            message: `${ERROR_MSG}: ${task.task_id}`,
        },
    };
}
