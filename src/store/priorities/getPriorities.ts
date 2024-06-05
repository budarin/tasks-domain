import type { DeepReadonly } from '@budarin/validate.ts';
import type { Priority } from '../../entities/index.js';

import { logger, store } from '../index.js';

export const getPriorities = (): DeepReadonly<Priority[]> => {
    logger.debug('getPriorities');

    return Object.freeze(Object.values(store.getState().priorities.byId));
};
