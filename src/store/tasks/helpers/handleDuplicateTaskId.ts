import type { Task } from '../../../entities/index.ts';
import type { ResultOrError } from '@budarin/validate.ts';

import { logger } from '../../index.js';

const ERROR_MSG = 'Добавление дубликата задачи';

export function handleDuplicateTaskId(task: Task): ResultOrError<Task> {
    logger.error(ERROR_MSG, task);

    return {
        error: {
            message: ERROR_MSG,
            data: task,
        },
    };
}
