import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Task } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { handleError } from '../_helpers/handleError.js';
import { validateTask } from '../../entities/index.js';
import { isTaskNotFound } from './helpers/isTaskNotFound.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';

export const errorMsg = 'Задача не найдена';

function updateState(state: TasksStoreState, task: Task): TasksStoreState {
    const { tasks } = state;
    const { task_id } = task;

    const restIds = tasks.ids.filter((id) => id !== task_id);
    const { [task_id]: _, ...restById } = tasks.byId;

    return {
        ...state,

        tasks: {
            ...tasks,

            ids: [...restIds],

            byId: { ...restById },
        },
    };
}

function deleteTaskFromStore(task: Task): ResultOrError<Task> {
    const state = store.getState();

    // есть ли задача в хранилище?
    if (isTaskNotFound(state, task)) {
        return handleError(task, 'Задача не найдена');
    }

    const nextState = updateState(state, task);

    if (nextState !== state) {
        store.setState(nextState);
        logger.debug('deleteTask:', task);
    }

    return { result: task };
}

export const deleteTask = createStoreMethod<Task>(validateTask, deleteTaskFromStore);
