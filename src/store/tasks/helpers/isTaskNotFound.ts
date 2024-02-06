import { shallow } from 'zustand/shallow';

import type { Task } from '../../../index.js';
import type { TasksStoreState } from '../../index.js';

export function isTaskNotFound(state: TasksStoreState, task: Task): boolean {
    return state.tasks.byId[task.task_id] === undefined || !shallow(state.tasks.byId[task.task_id], task);
}
