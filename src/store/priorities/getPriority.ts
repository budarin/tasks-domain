import type { DeepReadonly } from '@budarin/validate.ts';
import type { Priority, PriorityId } from '../../entities/index.js';

import { logger, store } from '../index.js';

export const getPriority = (id: PriorityId): DeepReadonly<Priority> | undefined => {
    logger.debug('getPriority', id);

    const priority = store.getState().priorities.byId[id];

    return Object.freeze(priority);
};
