import type { ResultOrError } from '@budarin/validate.ts';
import type { Task } from '../../../entities/index.js';
import { logger } from '../../index.js';
import { errorMsg } from '../deleteTask.js';

export function handleTaskNotFound(task: Task): ResultOrError<Task> {
    logger.error(errorMsg, task);

    return {
        error: {
            message: errorMsg,
            data: task,
        },
    };
}
