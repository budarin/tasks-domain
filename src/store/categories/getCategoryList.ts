import type { DeepReadonly } from '@budarin/validate.ts';
import type { CategoryId } from '../../entities/index.js';

import { store } from '../index.js';

export const getCategoryList = (): DeepReadonly<CategoryId[]> => {
    const task = store.getState().categories.ids;

    return Object.freeze(task);
};
