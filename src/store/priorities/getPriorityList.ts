import type { DeepReadonly } from '@budarin/validate.ts';
import type { PriorityId } from '../../entities/index.js';

import { store } from '../index.js';

export const getPriorityList = (): DeepReadonly<PriorityId[]> => {
    const task = store.getState().priorities.ids;

    return Object.freeze(task);
};
