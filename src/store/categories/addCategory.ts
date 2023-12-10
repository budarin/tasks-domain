import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.js';
import type { Category } from '../../entities/index.js';

import { logger, store } from '../index.js';
import { DUPLICATE_ERROR_MSG } from './utils/consts.js';
import { validateCategory } from '../../entities/index.js';
import { hasInvalidCategoryIcon } from './utils/hasInvalidIcon.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { handleInvalidCategoryIcon } from './utils/handleInvalidIcon.js';
import { hasDuplicateCategoryName } from './utils/hasDuplicateCategoryName.js';
import { handleDuplicateCategoryName } from './utils/handleDuplicateCategoryName.js';

// Constarints:
// - icon_id должен присутствовать в списке иконок
// - добавить пустой массив в idsByCategoryId
// - имя категории должно быть уникальным

function hasDuplicateCategoryId(state: TasksStoreState, category: Category): boolean {
    return Boolean(state.categories.byId[category.category_id]);
}

export function handleDuplicateCategoryId(category: Category): ResultOrError<Category> {
    return {
        error: {
            message: `${DUPLICATE_ERROR_MSG}: ${category.category_id}`,
        },
    };
}

function updateStateWithNewCategory(state: TasksStoreState, category: Category): void {
    const { category_id } = category;

    store.setState({
        ...state,

        categories: {
            ...state.categories,
            ids: [...state.categories.ids, category_id],
            byId: { ...state.categories.byId, [category_id]: category },
        },

        tasks: {
            ...state.tasks,
        },
    });
}

function addCategoryToStore(category: Category): ResultOrError<Category> {
    const state = store.getState();

    if (hasDuplicateCategoryId(state, category)) {
        return handleDuplicateCategoryId(category);
    }

    if (hasDuplicateCategoryName(state, category)) {
        return handleDuplicateCategoryName(category);
    }

    if (hasInvalidCategoryIcon(state, category)) {
        return handleInvalidCategoryIcon(category);
    }

    updateStateWithNewCategory(state, category);

    logger.debug('addCategory:', category);

    return { result: category };
}

export const addCategory = createStoreMethod<Category>(validateCategory, addCategoryToStore);
