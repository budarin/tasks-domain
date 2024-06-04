import type { DeepReadonly } from '@budarin/validate.ts';
import type { TaskId } from '../../entities/index.js';
import type { ExtendedTask } from '../index.js';

import { store } from '../index.js';

export const getTask = (id?: TaskId): DeepReadonly<ExtendedTask> | undefined => {
    if (!id) {
        return;
    }

    const task = store.getState().tasks.byId[id];

    return Object.freeze(task);
};
