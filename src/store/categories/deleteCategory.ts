import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.js';
import type { Category } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validateCategory } from '../../entities/index.js';
import { isCategoryNotFound } from './helpers/isCategoryNotFound.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { handleCategoryNotFound } from './helpers/handleCategoryNotFound.js';

// Constarints:
// - нельзя удалить категорию если ее Id отсутствует в хранилище
// - нельзя удалить категорию если она используется в tasks
// - удалить запись из idsByCategoryId

function isCategoryUsed(state: TasksStoreState, category: Category): boolean {
    return Boolean(Object.values(state.tasks.byId).find((task) => task.category_id === category.category_id));
}

const ERROR_MSG = 'Удаление категории, которая используется';

function handleUsedCategory(category: Category): ResultOrError<Category> {
    logger.error(ERROR_MSG, category);

    return {
        error: {
            message: ERROR_MSG,
            data: category,
        },
    };
}

function updateState(state: TasksStoreState, category: Category): TasksStoreState {
    const { category_id } = category;
    const { [category_id]: _, ...restById } = state.categories.byId;

    return {
        ...state,

        categories: {
            ...state.categories,

            ids: state.categories.ids.filter((id) => id !== category_id),

            byId: { ...restById },
        },
    };
}

function deleteCategoryFromStore(category: Category): ResultOrError<Category> {
    const state = store.getState();

    if (isCategoryNotFound(state, category)) {
        return handleCategoryNotFound(category);
    }

    if (isCategoryUsed(state, category)) {
        return handleUsedCategory(category);
    }

    const newState = updateState(state, category);

    if (newState !== state) {
        store.setState(newState);
        logger.debug('deleteCategory:', category);
    }

    return { result: category };
}

export const deleteCategory = createStoreMethod<Category>(validateCategory, deleteCategoryFromStore);
