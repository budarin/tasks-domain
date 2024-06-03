import type { DeepReadonly, ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.js';
import type { Category } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { handleError } from '../_helpers/handleError.js';
import { validateCategory } from '../../entities/index.js';
import { isCategoryNotFound } from './helpers/isCategoryNotFound.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';

// Constarints:
// - нельзя удалить категорию если ее Id отсутствует в хранилище
// - нельзя удалить категорию если она используется в tasks
// - удалить запись из idsByCategoryId

function isCategoryUsed(state: TasksStoreState, category: Category): boolean {
    return Boolean(Object.values(state.tasks.byId).find((task) => task.category_id === category.category_id));
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

function deleteCategoryFromStore(category: Category): DeepReadonly<ResultOrError<Category>> {
    const state = store.getState();

    if (isCategoryNotFound(state, category)) {
        return handleError(category, 'Категория не найдена');
    }

    if (isCategoryUsed(state, category)) {
        return handleError(category, 'Удаление категории, которая используется');
    }

    const nextState = updateState(state, category);

    if (nextState !== state) {
        store.setState(nextState);
        logger.debug('deleteCategory:', category);
    }

    return Object.freeze({ result: category });
}

export const deleteCategory = createStoreMethod<Category>(validateCategory, deleteCategoryFromStore);
