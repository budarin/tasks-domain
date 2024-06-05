import { useCallback } from 'react';

import type { DeepReadonly } from '@budarin/validate.ts';
import type { ExtendedTask, TasksStoreState } from '../index.js';
import type { TaskId } from '../../entities/index.js';

import { logger, store } from '../index.js';

export const useTask = (id: TaskId): DeepReadonly<ExtendedTask> | undefined => {
    logger.debug('useTask', id);

    const selector = useCallback((state: TasksStoreState) => state.tasks.byId[id], [id]);

    return Object.freeze(store(selector));
};
