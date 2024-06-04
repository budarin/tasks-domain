import type { DeepReadonly } from '@budarin/validate.ts';
import type { ExtendedTask } from '../index.js';

import { store } from '../index.js';

export const getTasks = (): DeepReadonly<ExtendedTask[]> => {
    return Object.freeze(Object.values(store.getState().tasks.byId));
};
