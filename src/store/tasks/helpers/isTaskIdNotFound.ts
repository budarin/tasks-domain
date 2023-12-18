import type { Task } from '../../../index.js';
import type { TasksStoreState } from '../../index.js';

export function isTaskIdNotFound(state: TasksStoreState, task: Task): boolean {
    return state.tasks.byId[task.task_id] === undefined;
}
