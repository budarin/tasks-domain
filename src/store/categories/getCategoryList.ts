import type { DeepReadonly } from '@budarin/validate.ts';
import type { CategoryId } from '../../entities/index.js';

import { logger, store } from '../index.js';

export const getCategoryList = (): DeepReadonly<CategoryId[]> => {
    logger.debug('getCategoryList');

    const task = store.getState().categories.ids;

    return Object.freeze(task);
};
