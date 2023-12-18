import type { Task } from '../../../index.js';
import type { TasksStoreState } from '../../index.js';

import { deepEqual } from '@budarin/deep-equal';

export function isTaskNotFound(state: TasksStoreState, task: Task): boolean {
    return state.tasks.byId[task.task_id] === undefined || !deepEqual(state.tasks.byId[task.task_id], task);
}
