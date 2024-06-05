import type { DeepReadonly } from '@budarin/validate.ts';
import type { Icon, IconId } from '../../entities/index.js';

import { logger, store } from '../index.js';

export const getIcon = (id: IconId): DeepReadonly<Icon> | undefined => {
    logger.debug('getIcon', id);

    const priority = store.getState().icons.byId[id];

    return Object.freeze(priority);
};
