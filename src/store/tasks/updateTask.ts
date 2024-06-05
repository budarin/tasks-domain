import type { DeepReadonly, ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Task } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validateTask } from '../../entities/index.js';
import { handleError } from '../_helpers/handleError.js';
import { isPriorityAbsent } from './helpers/isPriorityAbsent.js';
import { isTaskIdNotFound } from './helpers/isTaskIdNotFound.js';
import { isCategoryAbsent } from './helpers/isCategoryAbsent.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { createExtendedTask } from './helpers/createExtendedTask.js';

function updateState(state: TasksStoreState, task: Task): TasksStoreState {
    const { tasks } = state;
    const { task_id } = task;

    return {
        ...state,

        tasks: {
            ...tasks,

            byId: {
                ...tasks.byId,
                [task_id]: createExtendedTask(task),
            },
        },
    };
}

function updateTasksStore(task: Task): DeepReadonly<ResultOrError<Task>> {
    logger.debug('updateTask:', task);

    const state = store.getState();

    if (isTaskIdNotFound(state, task)) {
        return handleError(task, 'Задача не найдена');
    }

    if (isPriorityAbsent(state, task)) {
        return handleError(task, 'Обновление задачи с не существующим приоритетом');
    }

    if (isCategoryAbsent(state, task)) {
        return handleError(task, 'Обновление задачи с не существующей категорией');
    }

    const nextState = updateState(state, task);

    if (nextState !== state) {
        store.setState(nextState);
    }

    return Object.freeze({ result: task });
}

export const updateTask = createStoreMethod<Task>(validateTask, updateTasksStore);
