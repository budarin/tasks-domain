import { deepEqual } from '@budarin/deep-equal';
import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Category } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validateCategory } from '../../entities/index.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { hasInvalidCategoryIcon } from './helpers/hasInvalidIcon.js';
import { isCategoryIdNotFound } from './helpers/isCategoryIdNotFound.js';
import { handleInvalidCategoryIcon } from './helpers/handleInvalidIcon.js';
import { handleCategoryNotFound } from './helpers/handleCategoryNotFound.js';
import { hasDuplicateCategoryName } from './helpers/hasDuplicateCategoryName.js';
import { handleDuplicateCategoryName } from './helpers/handleDuplicateCategoryName.js';

// Constarints:
// - category_id должен существовать
// - в случае отсутствия иконки - ошибка
// - имя категории должно быть уникальным

function updateState(state: TasksStoreState, category: Category): TasksStoreState {
    const { category_id } = category;

    return {
        ...state,

        categories: {
            ...state.categories,

            byId: {
                ...state.categories.byId,
                [category_id]: category,
            },
        },
    };
}

function updateCategoryInStore(category: Category): ResultOrError<Category> {
    const state = store.getState();

    if (deepEqual(category, state.categories.byId[category.category_id])) {
        return { result: category };
    }

    if (isCategoryIdNotFound(state, category)) {
        return handleCategoryNotFound(category);
    }

    if (hasInvalidCategoryIcon(state, category)) {
        return handleInvalidCategoryIcon(category);
    }

    if (hasDuplicateCategoryName(state, category)) {
        return handleDuplicateCategoryName(category);
    }

    const nextState = updateState(state, category);

    if (nextState !== state) {
        store.setState(nextState);
        logger.debug('updateCategory:', category);
    }

    return { result: category };
}

export const updateCategory = createStoreMethod<Category>(validateCategory, updateCategoryInStore);
