import type { DeepReadonly } from '@budarin/validate.ts';
import type { TaskId } from '../../entities/index.js';

import { logger, store } from '../index.js';

export const getTaskList = (): DeepReadonly<TaskId[]> => {
    logger.debug('getTaskList');

    const task = store.getState().tasks.ids;

    return Object.freeze(task);
};
