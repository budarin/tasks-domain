import { deepEqual } from '@budarin/deep-equal';
import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Category } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validateCategory } from '../../entities/index.js';
import { isCategoryAbsent } from './helpers/isCategoryAbsent.js';
import { hasInvalidCategoryIcon } from './helpers/hasInvalidIcon.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { handleCategoryAbsence } from './helpers/handleCategoryAbsence.js';
import { handleInvalidCategoryIcon } from './helpers/handleInvalidIcon.js';
import { hasDuplicateCategoryName } from './helpers/hasDuplicateCategoryName.js';
import { handleDuplicateCategoryName } from './helpers/handleDuplicateCategoryName.js';

// Constarints:
// - category_id должен существовать
// - в случае отсутствия иконки - ошибка
// - имя категории должно быть уникальным

function updateState(state: TasksStoreState, category: Category): void {
    const { category_id } = category;

    const newState = {
        ...state,

        categories: {
            ...state.categories,
            byId: { ...state.categories.byId, [category_id]: category },
        },
    };

    store.setState(newState);
}

function updateCategoryInStore(category: Category): ResultOrError<Category> {
    const state = store.getState();

    if (deepEqual(category, state.categories.byId[category.category_id])) {
        return { result: category };
    }

    if (isCategoryAbsent(state, category)) {
        return handleCategoryAbsence(category);
    }

    if (hasInvalidCategoryIcon(state, category)) {
        return handleInvalidCategoryIcon(category);
    }

    if (hasDuplicateCategoryName(state, category)) {
        return handleDuplicateCategoryName(category);
    }

    updateState(state, category);

    logger.debug('updateCategory:', category, store.getState());

    return { result: category };
}

export const updateCategory = createStoreMethod<Category>(validateCategory, updateCategoryInStore);
