import type { ResultOrError } from '@budarin/validate.ts';
import type { Task } from '../../../entities/index.js';

export function handlePriorityAbsence(task: Task): ResultOrError<Task> {
    const ERROR_MSG = 'Добавление задачи с не существующим приоритетом';

    return {
        error: {
            message: `${ERROR_MSG}: ${task.priority_id}`,
        },
    };
}
