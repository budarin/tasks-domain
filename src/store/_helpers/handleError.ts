import type { ResultOrError } from '@budarin/validate.ts';

import { logger } from '../index.js';

export function handleError<T>(task: T, errorMessage: string): ResultOrError<T> {
    logger.error(errorMessage, task);

    return {
        error: {
            message: errorMessage,
            data: task,
        },
    };
}
