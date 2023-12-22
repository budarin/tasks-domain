import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Task } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validateTask } from '../../entities/index.js';
import { isTaskNotFound } from './helpers/isTaskNotFound.js';
import { handleTaskNotFound } from './helpers/handleTaskNotFound.js';
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
        return handleTaskNotFound(task);
    }

    const newState = updateState(state, task);

    if (newState !== state) {
        store.setState(newState);
        logger.debug('deleteTask:', task, store.getState());
    }

    return { result: task };
}

export const deleteTask = createStoreMethod<Task>(validateTask, deleteTaskFromStore);
