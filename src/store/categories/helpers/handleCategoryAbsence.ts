import type { ResultOrError } from '@budarin/validate.ts';
import type { Category } from '../../../entities/index.ts';

import { logger } from '../../index.js';

const ERROR_MSG = 'Отсутствие категории в хранилище';

export function handleCategoryAbsence(category: Category): ResultOrError<Category> {
    logger.error(ERROR_MSG, category);

    return {
        error: {
            message: ERROR_MSG,
            data: category,
        },
    };
}
