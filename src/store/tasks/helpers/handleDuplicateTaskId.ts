import type { Task } from '../../../entities/index.ts';
import type { ResultOrError } from '@budarin/validate.ts';

import { logger } from '../../index.js';

const ERROR_MSG = 'Добавление дубликата задачи';

export function handleDuplicateTaskId(task: Task): ResultOrError<Task> {
    const errorMsg = `${ERROR_MSG}: ${task.task_id}`;

    logger.error(errorMsg);

    return {
        error: {
            message: errorMsg,
        },
    };
}
