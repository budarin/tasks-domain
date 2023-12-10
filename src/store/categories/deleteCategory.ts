import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.js';
import type { Category } from '../../entities/index.js';

import { logger, store } from '../index.js';
import { validateCategory } from '../../entities/index.js';
import { isCategoryAbsent } from './helpers/isCategoryAbsent.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { handleCategoryAbsence } from './helpers/handleCategoryAbsence.js';

// Constarints:
// - нельзя удалить категорию если ее Id отсутствует в хранилище
// - нельзя удалить категорию если она используется в tasks
// - удалить запись из idsByCategoryId

function isCategoryUsed(state: TasksStoreState, category: Category): boolean {
    return Boolean(Object.values(state.tasks.byId).find((task) => task.category_id === category.category_id));
}

const ERROR_MSG = 'Удаление категории, которая используется';

function handleUsedCategory(category: Category): ResultOrError<Category> {
    return {
        error: {
            message: `${ERROR_MSG}: "${category.category_name}"`,
        },
    };
}

function updateState(state: TasksStoreState, category: Category): void {
    const { category_id } = category;
    const { [category_id]: _, ...categoryByIdWothoudDeleted } = state.categories.byId;

    store.setState({
        ...state,

        categories: {
            ...state.categories,
            byId: categoryByIdWothoudDeleted,
            ids: state.categories.ids.filter((id) => id !== category_id),
        },
    });
}

function deleteCategoryFromStore(category: Category): ResultOrError<Category> {
    const state = store.getState();

    if (isCategoryAbsent(state, category)) {
        return handleCategoryAbsence(category);
    }

    if (isCategoryUsed(state, category)) {
        return handleUsedCategory(category);
    }

    updateState(state, category);

    logger.debug('deleteCategory:', category);

    return { result: category };
}

export const deleteCategory = createStoreMethod<Category>(validateCategory, deleteCategoryFromStore);
