import { useCallback } from 'react';

import type { DeepReadonly } from '@budarin/validate.ts';
import type { TasksStoreState } from '../index.js';
import type { Icon, IconId } from '../../entities/index.js';

import { logger, store } from '../index.js';

export const useIcon = (id: IconId): DeepReadonly<Icon> | undefined => {
    logger.debug('useIcon', id);

    const selector = useCallback((state: TasksStoreState) => state.icons.byId[id], [id]);

    return Object.freeze(store(selector));
};
