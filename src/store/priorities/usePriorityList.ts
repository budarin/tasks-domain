import type { DeepReadonly } from '@budarin/validate.ts';
import type { TasksStoreState } from '../index.js';
import type { PriorityId } from '../../entities/index.js';

import { logger, store } from '../index.js';

const selector = (state: TasksStoreState) => state.priorities.ids;

export const usePriorityList = (): DeepReadonly<PriorityId[]> => {
    logger.debug('usePriorityList');

    return Object.freeze(store(selector));
};
