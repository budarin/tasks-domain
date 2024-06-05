import type { DeepReadonly } from '@budarin/validate.ts';
import type { ExtendedTask } from '../index.js';

import { logger, store } from '../index.js';

export const getTasks = (): DeepReadonly<ExtendedTask[]> => {
    logger.debug('getTasks');

    return Object.freeze(Object.values(store.getState().tasks.byId));
};
