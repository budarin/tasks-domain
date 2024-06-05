import { useShallow } from 'zustand/react/shallow';

import type { DeepReadonly } from '@budarin/validate.ts';
import type { Priority } from '../../entities/index.js';
import type { TasksStoreState } from '../index.js';

import { store } from '../index.js';

const selector = (state: TasksStoreState) => Object.values(state.priorities.byId);

export const usePriorities = (): DeepReadonly<Priority[]> => {
    return Object.freeze(store(useShallow(selector)));
};
