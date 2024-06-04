import type { DeepReadonly } from '@budarin/validate.ts';
import type { Category } from '../../entities/index.js';

import { store } from '../index.js';

export const getCategories = (): DeepReadonly<Category[]> => {
    return Object.freeze(Object.values(store.getState().categories.byId));
};
