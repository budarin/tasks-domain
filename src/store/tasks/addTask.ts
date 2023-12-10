import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.js';
import type { Task } from '../../entities/index.js';

import { logger, store } from '../index.js';
import { validateTask } from '../../entities/index.js';
import { isPriorityAbsent } from './helpers/isPriorityAbsent.js';
import { isCategoryAbsent } from './helpers/isCategoryAbsent.js';
import { createExtendedTask } from './helpers/createExtendedTask.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { hasDuplicateTaskId } from './helpers/hasDuplicateTaskId.js';
import { handleDuplicateTaskId } from './helpers/handleDuplicateTaskId.js';
import { handlePriorityAbsence } from './helpers/handlePriorityAbsence.js';
import { handleCategoryAbsence } from './helpers/handleCategoryAbsence.js';

function updateState(state: TasksStoreState, task: Task): void {
    const { tasks } = state;
    const { task_id } = task;
    const newTask = createExtendedTask(task);

    const newState = {
        ...state,

        tasks: {
            ...tasks,
            ids: [...tasks.ids, task_id],
            byId: { ...tasks.byId, [task_id]: newTask },
        },
    };

    store.setState(newState);
}

function addTaskToStore(task: Task): ResultOrError<Task> {
    const state = store.getState();

    if (hasDuplicateTaskId(state, task)) {
        return handleDuplicateTaskId(task);
    }

    if (isPriorityAbsent(state, task)) {
        return handlePriorityAbsence(task);
    }

    if (isCategoryAbsent(state, task)) {
        return handleCategoryAbsence(task);
    }

    updateState(state, task);

    logger.debug('addTask:', task);

    return { result: task };
}

export const addTask = createStoreMethod<Task>(validateTask, addTaskToStore);
