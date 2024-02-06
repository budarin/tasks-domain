import { shallow } from 'zustand/shallow';

import type { TasksStoreState } from '../../index.js';
import type { Category } from '../../../entities/index.js';

export function isCategoryNotFound(state: TasksStoreState, category: Category): boolean {
    return (
        Boolean(state.categories.byId[category.category_id] === undefined) ||
        !shallow(state.categories.byId[category.category_id], category)
    );
}
