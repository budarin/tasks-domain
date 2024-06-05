import type { DeepReadonly } from '@budarin/validate.ts';
import type { IconId } from '../../entities/index.js';

import { logger, store } from '../index.js';

export const getIconList = (): DeepReadonly<IconId[]> => {
    logger.debug('getIconList');

    const task = store.getState().icons.ids;

    return Object.freeze(task);
};
