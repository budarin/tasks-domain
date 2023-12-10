import type { ResultOrError } from '@budarin/validate.ts';
import type { Category } from '../../../entities/index.ts';

const ERROR_MSG = 'Отсутствие категории в хранилище';

export function handleCategoryAbsence(category: Category): ResultOrError<Category> {
    return {
        error: {
            message: `${ERROR_MSG}: ${category.category_id}`,
        },
    };
}
