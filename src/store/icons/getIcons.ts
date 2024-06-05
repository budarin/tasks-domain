import type { DeepReadonly } from '@budarin/validate.ts';
import type { Icon } from '../../entities/index.js';

import { logger, store } from '../index.js';

export const getIcons = (): DeepReadonly<Icon[]> => {
    logger.debug('getIcons');

    return Object.freeze(Object.values(store.getState().icons.byId));
};
