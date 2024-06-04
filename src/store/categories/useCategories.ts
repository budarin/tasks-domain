import { useShallow } from 'zustand/react/shallow';

import type { DeepReadonly } from '@budarin/validate.ts';
import type { Category } from '../../entities/index.js';
import type { TasksStoreState } from '../index.js';

import { store } from '../index.js';

export const useCategories = (): DeepReadonly<Category[]> => {
    const selector = (state: TasksStoreState) => Object.values(state.categories.byId);

    return Object.freeze(store(useShallow(selector)));
};
