import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Task } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validateTask } from '../../entities/index.js';
import { handleTaskNotFound } from './helpers/handleTaskNotFound.js';
import { isPriorityAbsent } from './helpers/isPriorityAbsent.js';
import { isTaskIdNotFound } from './helpers/isTaskIdNotFound.js';
import { isCategoryAbsent } from './helpers/isCategoryAbsent.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { createExtendedTask } from './helpers/createExtendedTask.js';
import { handlePriorityAbsence } from './helpers/handlePriorityAbsence.js';
import { handleCategoryAbsence } from './helpers/handleCategoryAbsence.js';

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

function updateTasksStore(task: Task): ResultOrError<Task> {
    const state = store.getState();

    if (isTaskIdNotFound(state, task)) {
        return handleTaskNotFound(task);
    }

    if (isPriorityAbsent(state, task)) {
        return handlePriorityAbsence(task);
    }

    if (isCategoryAbsent(state, task)) {
        return handleCategoryAbsence(task);
    }

    const newState = updateState(state, task);

    if (newState !== state) {
        store.setState(newState);
        logger.debug('updateTask:', task);
    }

    return { result: task };
}

export const updateTask = createStoreMethod<Task>(validateTask, updateTasksStore);
