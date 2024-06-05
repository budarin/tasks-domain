import { useCallback } from 'react';

import { DeepReadonly } from '@budarin/validate.ts';
import { TasksStoreState, logger, store } from '../index.js';
import { Category, CategoryId } from '../../entities/index.js';

export const useCategory = (id: CategoryId): DeepReadonly<Category> | undefined => {
    logger.debug('useCategory', id);

    const selector = useCallback(
        (state: TasksStoreState): Category | undefined => state.categories.byId[id],
        [id],
    );

    return Object.freeze(store(selector));
};
