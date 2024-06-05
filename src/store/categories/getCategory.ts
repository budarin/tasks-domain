import type { DeepReadonly } from '@budarin/validate.ts';
import type { Category, CategoryId } from '../../entities/index.js';

import { store } from '../index.js';

export const getCategory = (id: CategoryId): DeepReadonly<Category> | undefined => {
    const priority = store.getState().categories.byId[id];

    return Object.freeze(priority);
};
