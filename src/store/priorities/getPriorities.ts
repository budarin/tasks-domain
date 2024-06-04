import type { DeepReadonly } from '@budarin/validate.ts';
import type { Priority } from '../../entities/index.js';

import { store } from '../index.js';

export const getPriorities = (): DeepReadonly<Priority[]> => {
    return Object.freeze(Object.values(store.getState().priorities.byId));
};
