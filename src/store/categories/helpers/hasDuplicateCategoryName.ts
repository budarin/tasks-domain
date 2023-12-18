import type { TasksStoreState } from '../../index.js';
import type { Category } from '../../../entities/index.ts';

export function hasDuplicateCategoryName(state: TasksStoreState, category: Category): boolean {
    for (const id in state.categories.byId) {
        if (state.categories.byId[id].category_name === category.category_name && Number(id) !== category.category_id) {
            return true;
        }
    }
    return false;
}
