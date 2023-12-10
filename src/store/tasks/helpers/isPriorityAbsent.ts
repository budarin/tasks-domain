import type { TasksStoreState } from '../../index.js';
import type { Task } from '../../../entities/index.js';

export function isPriorityAbsent(state: TasksStoreState, task: Task): boolean {
    return Boolean(state.priorities.byId[task.priority_id] === undefined);
}
