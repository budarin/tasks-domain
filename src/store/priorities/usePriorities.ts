import { useShallow } from 'zustand/react/shallow';

import type { DeepReadonly } from '@budarin/validate.ts';
import type { Priority } from '../../entities/index.js';
import type { TasksStoreState } from '../index.js';

import { store } from '../index.js';

export const usePriorities = (): DeepReadonly<Priority[]> => {
    const selector = (state: TasksStoreState) => Object.values(state.priorities.byId);

    return Object.freeze(store(useShallow(selector)));
};
