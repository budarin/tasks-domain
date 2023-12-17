import type { Task } from '../../../entities/index.ts';
import type { ResultOrError } from '@budarin/validate.ts';
import { logger } from '../../index.js';

const ERROR_MSG = 'Добавление задачи с не существующим приоритетом';

export function handlePriorityAbsence(task: Task): ResultOrError<Task> {
    const errorMsg = `${ERROR_MSG}: ${task}`;

    logger.error(errorMsg);

    return {
        error: {
            message: errorMsg,
        },
    };
}
