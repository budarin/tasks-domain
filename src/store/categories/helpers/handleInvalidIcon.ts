import type { ResultOrError } from '@budarin/validate.ts';
import type { Category } from '../../../entities/index.ts';
import { logger } from '../../index.js';

const ERROR_MSG = 'Модификация категории с не существующей иконкой';

export function handleInvalidCategoryIcon(category: Category): ResultOrError<Category> {
    logger.error(ERROR_MSG, category);

    return {
        error: {
            message: ERROR_MSG,
            data: category,
        },
    };
}
