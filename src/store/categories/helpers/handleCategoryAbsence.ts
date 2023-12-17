import type { ResultOrError } from '@budarin/validate.ts';
import type { Category } from '../../../entities/index.ts';

import { logger } from '../../index.js';

const ERROR_MSG = 'Отсутствие категории в хранилище';

export function handleCategoryAbsence(category: Category): ResultOrError<Category> {
    const errorMsg = `${ERROR_MSG}: ${category.category_id}`;

    logger.error(errorMsg);

    return {
        error: {
            message: errorMsg,
        },
    };
}
