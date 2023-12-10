import type { TasksStoreState } from '../../index.ts';
import type { Task } from '../../../entities/index.ts';

export function isPriorityAbsent(state: TasksStoreState, task: Task): boolean {
    return Boolean(state.priorities.byId[task.priority_id] === undefined);
}
