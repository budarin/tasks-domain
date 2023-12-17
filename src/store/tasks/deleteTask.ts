import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Task } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validateTask } from '../../entities/index.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';

function handleNonExistingTask(task: Task): ResultOrError<Task> {
    const errorMsg = `Попытка удаления несуществующей задачи: ${task.task_id}`;

    logger.error(errorMsg);

    return {
        error: {
            message: errorMsg,
        },
    };
}

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
    if (!state.tasks.byId[task.task_id]) {
        return handleNonExistingTask(task);
    }

    updateState(state, task);

    logger.debug('addTask:', task, store.getState());

    return { result: task };
}

export const deleteTask = createStoreMethod<Task>(validateTask, deleteTaskFromStore);
