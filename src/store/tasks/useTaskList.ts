import type { DeepReadonly } from '@budarin/validate.ts';
import type { TasksStoreState } from '../index.js';
import type { TaskId } from '../../entities/index.js';

import { store } from '../index.js';

const selector = (state: TasksStoreState) => state.tasks.ids;

export const useTaskList = (): DeepReadonly<TaskId[]> => {
    return Object.freeze(store(selector));
};
