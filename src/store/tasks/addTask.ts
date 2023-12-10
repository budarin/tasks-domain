import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.js';
import type { Task } from '../../entities/index.js';

import { logger, store } from '../index.js';
import { validateTask } from '../../entities/index.js';
import { createExtendedTask } from './utils/createExtendedTask.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';

// Constarints:
// - priority_id должен присутствовать в списке статусов
// - category_id (если присутствует) должен присутствовать в списке категорий
// - во все списки ids добавлять id задачи в отсортированном по due-date-time-ts порядке

function hasDuplicateTaskId(state: TasksStoreState, task: Task): boolean {
    return Boolean(state.tasks.byId[task.task_id]);
}

function handleDuplicateTaskId(task: Task): ResultOrError<Task> {
    const ERROR_MSG = 'Добавление дубликата задачи';

    return {
        error: {
            message: `${ERROR_MSG}: ${task.task_id}`,
        },
    };
}

function isPriorityAbsent(state: TasksStoreState, task: Task): boolean {
    return Boolean(state.priorities.byId[task.priority_id] === undefined);
}

function handlePriorityAbsence(task: Task): ResultOrError<Task> {
    const ERROR_MSG = 'Добавление задачи с не существующим приоритетом';

    return {
        error: {
            message: `${ERROR_MSG}: ${task.priority_id}`,
        },
    };
}

function isCategoryAbsent(state: TasksStoreState, task: Task): boolean {
    return Boolean(task.category_id !== undefined && state.categories.byId[task.category_id] === undefined);
}

function handleCategoryAbsence(task: Task): ResultOrError<Task> {
    const ERROR_MSG = 'Добавление задачи с не существующей категорией';

    return {
        error: {
            message: `${ERROR_MSG}: ${task.category_id}`,
        },
    };
}

function updateStateWithNewTask(state: TasksStoreState, task: Task): void {
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

    updateStateWithNewTask(state, task);

    logger.debug('addTask:', task);

    return { result: task };
}

export const addTask = createStoreMethod<Task>(validateTask, addTaskToStore);
