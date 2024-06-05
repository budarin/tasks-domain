import { useShallow } from 'zustand/react/shallow';

import type { DeepReadonly } from '@budarin/validate.ts';
import type { Category } from '../../entities/index.js';
import type { TasksStoreState } from '../index.js';

import { store } from '../index.js';

const selector = (state: TasksStoreState) => Object.values(state.categories.byId);

export const useCategories = (): DeepReadonly<Category[]> => {
    return Object.freeze(store(useShallow(selector)));
};
