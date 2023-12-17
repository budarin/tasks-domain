import type { ResultOrError } from '@budarin/validate.ts';
import type { Category } from '../../../entities/index.ts';

import { logger } from '../../index.js';
import { DUPLICATE_ERROR_MSG } from './consts.js';

export function handleDuplicateCategoryName(category: Category): ResultOrError<Category> {
    const errorMsg = `${DUPLICATE_ERROR_MSG}: ${category.category_name}`;

    logger.error(errorMsg);

    return {
        error: {
            message: errorMsg,
        },
    };
}
