import { useCallback } from 'react';

import type { DeepReadonly } from '@budarin/validate.ts';
import type { TasksStoreState } from '../index.js';
import type { Priority, PriorityId } from '../../entities/index.js';

import { store } from '../index.js';

export const usePriority = (id: PriorityId): DeepReadonly<Priority> | undefined => {
    const selector = useCallback((state: TasksStoreState) => state.priorities.byId[id], [id]);

    return Object.freeze(store(selector));
};
