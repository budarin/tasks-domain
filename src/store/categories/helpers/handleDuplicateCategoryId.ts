import type { ResultOrError } from '@budarin/validate.ts';
import type { Category } from '../../../entities/index.ts';

import { DUPLICATE_ERROR_MSG } from './consts.js';

export function handleDuplicateCategoryId(category: Category): ResultOrError<Category> {
    return {
        error: {
            message: `${DUPLICATE_ERROR_MSG}: ${category.category_id}`,
        },
    };
}
