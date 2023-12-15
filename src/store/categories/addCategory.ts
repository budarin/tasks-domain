import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Category } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validateCategory } from '../../entities/index.js';
import { hasInvalidCategoryIcon } from './helpers/hasInvalidIcon.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { handleInvalidCategoryIcon } from './helpers/handleInvalidIcon.js';
import { hasDuplicateCategoryName } from './helpers/hasDuplicateCategoryName.js';
import { handleDuplicateCategoryName } from './helpers/handleDuplicateCategoryName.js';
import { handleDuplicateCategoryId } from './helpers/handleDuplicateCategoryId.js';
import { hasDuplicateCategoryId } from './helpers/hasDuplicateCategoryId.js';

function updateState(state: TasksStoreState, category: Category): void {
    const { category_id } = category;

    const newState = {
        ...state,

        categories: {
            ...state.categories,
            ids: [...state.categories.ids, category_id],
            byId: { ...state.categories.byId, [category_id]: category },
        },

        tasks: {
            ...state.tasks,
        },
    };

    store.setState(newState);
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

    updateState(state, category);

    logger.debug('addCategory:', category, store.getState());

    return { result: category };
}

export const addCategory = createStoreMethod<Category>(validateCategory, addCategoryToStore);
