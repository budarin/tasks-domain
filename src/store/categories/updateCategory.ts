import { deepEqual } from '@budarin/deep-equal';
import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.js';
import type { Category } from '../../entities/index.js';

import { logger, store } from '../index.js';
import { validateCategory } from '../../entities/index.js';
import { isCategoryAbsent } from './utils/isCategoryAbsent.js';
import { hasInvalidCategoryIcon } from './utils/hasInvalidIcon.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { handleCategoryAbsence } from './utils/handleCategoryAbsence.js';
import { handleInvalidCategoryIcon } from './utils/handleInvalidIcon.js';
import { hasDuplicateCategoryName } from './utils/hasDuplicateCategoryName.js';
import { handleDuplicateCategoryName } from './utils/handleDuplicateCategoryName.js';

// Constarints:
// - category_id должен существовать
// - в случае отсутствия иконки - ошибка
// - имя категории должно быть уникальным

function handleUpdateStateWithUpdatedCategory(state: TasksStoreState, category: Category): void {
    const { category_id } = category;

    store.setState({
        ...state,

        categories: {
            ...state.categories,
            byId: { ...state.categories.byId, [category_id]: category },
        },
    });
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

    handleUpdateStateWithUpdatedCategory(state, category);

    logger.debug('updateCategory:', category);

    return { result: category };
}

export const updateCategory = createStoreMethod<Category>(validateCategory, updateCategoryInStore);
