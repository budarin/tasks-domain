import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Task } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validateTask } from '../../entities/index.js';
import { isTaskNotFound } from './helpers/isTaskNotFound.js';
import { handleTaskNotFound } from './helpers/handleTaskNotFound.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';

export const errorMsg = 'Задача не найдена';

function updateState(state: TasksStoreState, task: Task): void {
    const { tasks } = state;
    const { task_id } = task;

    const restIds = tasks.ids.filter((id) => id !== task_id);
    const { [task_id]: _, ...restById } = tasks.byId;

    const newState = {
        ...state,

        tasks: {
            ...tasks,

            ids: [...restIds],

            byId: { ...restById },
        },
    };

    store.setState(newState);
}

function deleteTaskFromStore(task: Task): ResultOrError<Task> {
    const state = store.getState();

    // есть ли задача в хранилище?
    if (isTaskNotFound(state, task)) {
        return handleTaskNotFound(task);
    }

    updateState(state, task);

    logger.debug('addTask:', task, store.getState());

    return { result: task };
}

export const deleteTask = createStoreMethod<Task>(validateTask, deleteTaskFromStore);
