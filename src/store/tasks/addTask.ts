import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.js';
import type { Task } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validateTask } from '../../entities/index.js';
import { handleError } from '../_helpers/handleError.js';
import { isPriorityAbsent } from './helpers/isPriorityAbsent.js';
import { isCategoryAbsent } from './helpers/isCategoryAbsent.js';
import { createExtendedTask } from './helpers/createExtendedTask.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';
import { hasDuplicateTaskId } from './helpers/hasDuplicateTaskId.js';

function updateState(state: TasksStoreState, task: Task): TasksStoreState {
    const { tasks } = state;
    const { task_id } = task;

    const newTask = createExtendedTask(task);

    return {
        ...state,

        tasks: {
            ...tasks,

            ids: [...tasks.ids, task_id],

            byId: {
                ...tasks.byId,
                [task_id]: newTask,
            },
        },
    };
}

function addTaskToStore(task: Task): ResultOrError<Task> {
    const state = store.getState();

    if (hasDuplicateTaskId(state, task)) {
        return handleError(task, 'Добавление дубликата задачи');
    }

    if (isPriorityAbsent(state, task)) {
        return handleError(task, 'Добавление задачи с не существующим приоритетом');
    }

    if (isCategoryAbsent(state, task)) {
        return handleError(task, 'Добавление задачи с не существующей категорией');
    }

    const nextState = updateState(state, task);

    if (nextState !== state) {
        store.setState(nextState);
        logger.debug('addTask:', task);
    }

    return { result: task };
}

export const addTask = createStoreMethod<Task>(validateTask, addTaskToStore);
