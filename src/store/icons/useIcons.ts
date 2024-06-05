import { useShallow } from 'zustand/react/shallow';

import type { DeepReadonly } from '@budarin/validate.ts';
import type { Icon } from '../../entities/index.js';
import type { TasksStoreState } from '../index.js';

import { logger, store } from '../index.js';

const selector = (state: TasksStoreState) => Object.values(state.icons.byId);

export const useIcons = (): DeepReadonly<Icon[]> => {
    logger.debug('useIcons');

    return Object.freeze(store(useShallow(selector)));
};
