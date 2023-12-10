import type { TasksStoreState } from '../../index.js';
import type { Category } from '../../../entities/index.js';

export function isCategoryAbsent(state: TasksStoreState, category: Category): boolean {
    return Boolean(state.categories.byId[category.category_id] === undefined);
}
