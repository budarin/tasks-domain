import type { ResultOrError } from '@budarin/validate.ts';
import type { Task } from '../../../entities/index.js';

export function handleCategoryAbsence(task: Task): ResultOrError<Task> {
    const ERROR_MSG = 'Добавление задачи с не существующей категорией';

    return {
        error: {
            message: `${ERROR_MSG}: ${task.category_id}`,
        },
    };
}
