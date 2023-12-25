import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Category } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { handleError } from '../_helpers/handleError.js';
import { validateCategory } from '../../entities/index.js';
import { hasInvalidCategoryIcon } from './helpers/hasInvalidIcon.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { hasDuplicateCategoryId } from './helpers/hasDuplicateCategoryId.js';
import { hasDuplicateCategoryName } from './helpers/hasDuplicateCategoryName.js';

function updateState(state: TasksStoreState, category: Category): TasksStoreState {
    const { category_id } = category;

    return {
        ...state,

        categories: {
            ...state.categories,

            ids: [...state.categories.ids, category_id],

            byId: {
                ...state.categories.byId,
                [category_id]: category,
            },
        },
    };
}

function addCategoryToStore(category: Category): ResultOrError<Category> {
    const state = store.getState();

    if (hasDuplicateCategoryId(state, category)) {
        return handleError(category, 'Добавление дубликата категории');
    }

    if (hasDuplicateCategoryName(state, category)) {
        return handleError(category, 'Добавление категории с уже существующим именем категории');
    }

    if (hasInvalidCategoryIcon(state, category)) {
        return handleError(category, 'Добавление категории с не существующей иконкой');
    }

    const nextState = updateState(state, category);

    if (nextState !== state) {
        store.setState(nextState);
        logger.debug('addCategory:', category);
    }

    return { result: category };
}

export const addCategory = createStoreMethod<Category>(validateCategory, addCategoryToStore);
