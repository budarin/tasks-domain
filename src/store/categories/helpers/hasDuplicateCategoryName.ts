import type { TasksStoreState } from '../../index.js';
import type { Category } from '../../../entities/index.js';

export function hasDuplicateCategoryName(state: TasksStoreState, category: Category): boolean {
    for (const id in state.categories.byId) {
        if (state.categories.byId[id].category_name === category.category_name) {
            return true;
        }
    }
    return false;
}
