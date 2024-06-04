import type { DeepReadonly, ResultOrError } from '@budarin/validate.ts';

import { logger } from '../index.js';

export function handleError<T>(task: T, errorMessage: string): DeepReadonly<ResultOrError<T>> {
    logger.error(errorMessage, task);

    return Object.freeze({
        error: {
            message: errorMessage,
            data: task,
        },
    });
}
