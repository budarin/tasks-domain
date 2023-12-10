import type { TasksStoreState } from '../../index.js';
import type { Category } from '../../../entities/index.ts';

export function hasInvalidCategoryIcon(state: TasksStoreState, category: Category): boolean {
    return Boolean(state.icons.byId[category.icon_id] === undefined);
}
