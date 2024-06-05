import type { DeepReadonly } from '@budarin/validate.ts';
import type { PriorityId } from '../../entities/index.js';

import { logger, store } from '../index.js';

export const getPriorityList = (): DeepReadonly<PriorityId[]> => {
    logger.debug('getPriorityList');

    const task = store.getState().priorities.ids;

    return Object.freeze(task);
};
