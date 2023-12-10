import type { TasksStoreState } from '../../index.js';
import type { Task } from '../../../entities/index.js';

export function isCategoryAbsent(state: TasksStoreState, task: Task): boolean {
    return Boolean(task.category_id !== undefined && state.categories.byId[task.category_id] === undefined);
}
