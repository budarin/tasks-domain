import { useShallow } from 'zustand/react/shallow';

import type { DeepReadonly } from '@budarin/validate.ts';
import type { ExtendedTask, TasksStoreState } from '../index.js';

import { logger, store } from '../index.js';

const selector = (state: TasksStoreState) => Object.values(state.tasks.byId);

export const useTasks = (): DeepReadonly<ExtendedTask[]> => {
    logger.debug('useTasks');

    return Object.freeze(store(useShallow(selector)));
};
