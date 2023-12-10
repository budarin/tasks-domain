import type { ResultOrError } from '@budarin/validate.ts';
import type { Category } from '../../../entities/index.js';

const ERROR_MSG = 'Модификация категории с не существующей иконкой';

export function handleInvalidCategoryIcon(category: Category): ResultOrError<Category> {
    return {
        error: {
            message: `${ERROR_MSG} id = ${category.icon_id}`,
        },
    };
}
