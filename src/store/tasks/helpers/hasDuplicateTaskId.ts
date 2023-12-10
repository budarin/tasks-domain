import type { TasksStoreState } from '../../index.ts';
import type { Task } from '../../../entities/index.ts';

// Constarints:
// - priority_id должен присутствовать в списке статусов
// - category_id (если присутствует) должен присутствовать в списке категорий
// - во все списки ids добавлять id задачи в отсортированном по due-date-time-ts порядке
export function hasDuplicateTaskId(state: TasksStoreState, task: Task): boolean {
    return Boolean(state.tasks.byId[task.task_id]);
}
