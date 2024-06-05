import type { DeepReadonly } from '@budarin/validate.ts';
import type { TasksStoreState } from '../index.js';
import type { CategoryId } from '../../entities/index.js';

import { store } from '../index.js';

const selector = (state: TasksStoreState) => state.categories.ids;

export const useCategoryList = (): DeepReadonly<CategoryId[]> => {
    return Object.freeze(store(selector));
};
