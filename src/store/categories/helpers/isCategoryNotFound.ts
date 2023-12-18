import type { TasksStoreState } from '../../index.js';
import type { Category } from '../../../entities/index.js';

import { deepEqual } from '@budarin/deep-equal';

export function isCategoryNotFound(state: TasksStoreState, category: Category): boolean {
    return (
        Boolean(state.categories.byId[category.category_id] === undefined) ||
        !deepEqual(state.categories.byId[category.category_id], category)
    );
}
