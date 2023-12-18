import type { ResultOrError } from '@budarin/validate.ts';
import type { Category } from '../../../entities/index.js';

import { logger } from '../../index.js';

const ERROR_MSG = 'Категория не найдена';

export function handleCategoryNotFound(category: Category): ResultOrError<Category> {
    logger.error(ERROR_MSG, category);

    return {
        error: {
            message: ERROR_MSG,
            data: category,
        },
    };
}
