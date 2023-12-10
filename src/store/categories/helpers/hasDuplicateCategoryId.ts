import type { TasksStoreState } from '../../index.js';
import type { Category } from '../../../entities/index.ts';

// Constarints:
// - icon_id должен присутствовать в списке иконок
// - добавить пустой массив в idsByCategoryId
// - имя категории должно быть уникальным
export function hasDuplicateCategoryId(state: TasksStoreState, category: Category): boolean {
    return Boolean(state.categories.byId[category.category_id]);
}
