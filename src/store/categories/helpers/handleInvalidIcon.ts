import type { ResultOrError } from '@budarin/validate.ts';
import type { Category } from '../../../entities/index.ts';
import { logger } from '../../index.js';

const ERROR_MSG = 'Модификация категории с не существующей иконкой';

export function handleInvalidCategoryIcon(category: Category): ResultOrError<Category> {
    const errorMsg = `${ERROR_MSG} id = ${category}`;

    logger.error(errorMsg);

    return {
        error: {
            message: errorMsg,
        },
    };
}
