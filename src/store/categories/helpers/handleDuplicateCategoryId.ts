import type { ResultOrError } from '@budarin/validate.ts';
import type { Category } from '../../../entities/index.ts';

import { logger } from '../../index.js';
import { DUPLICATE_ERROR_MSG } from './consts.js';

export function handleDuplicateCategoryId(category: Category): ResultOrError<Category> {
    logger.error(DUPLICATE_ERROR_MSG, category);

    return {
        error: {
            message: DUPLICATE_ERROR_MSG,
            data: category,
        },
    };
}
