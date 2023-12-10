import type { TasksStoreState } from '../../index.ts';
import type { Task } from '../../../entities/index.ts';

export function isCategoryAbsent(state: TasksStoreState, task: Task): boolean {
    return Boolean(task.category_id !== undefined && state.categories.byId[task.category_id] === undefined);
}
