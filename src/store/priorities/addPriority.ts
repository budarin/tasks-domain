import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.js';
import type { Priority } from '../../entities/index.js';

import { logger, store } from '../index.js';
import { validatePriority } from '../../entities/index.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';

function hasDuplicatePriorityId(state: TasksStoreState, priority: Priority): boolean {
    return Boolean(state.priorities.ids.indexOf(priority.priority_id) > -1);
}

const ERROR_MSG = 'Добавление дубликата приоритета';

function handleDuplicatePriorityId(priority: Priority): ResultOrError<Priority> {
    return {
        error: {
            message: `${ERROR_MSG}: ${priority.priority_id}`,
        },
    };
}

export function hasDuplicatePriorityName(state: TasksStoreState, priority: Priority): boolean {
    for (const id in state.priorities.byId) {
        if (state.priorities.byId[id].priority_name === priority.priority_name) {
            return true;
        }
    }
    return false;
}

export function handleDuplicatePriorityName(priority: Priority): ResultOrError<Priority> {
    return {
        error: {
            message: `${ERROR_MSG}: ${priority.priority_name}`,
        },
    };
}

function updateStateWithNewPriority(state: TasksStoreState, priority: Priority): void {
    const { priority_id } = priority;

    store.setState({
        ...state,
        priorities: {
            ...state.priorities,
            ids: [...state.priorities.ids, priority_id],
            byId: { ...state.priorities.byId, [priority_id]: priority },
        },
    });
}

function addPriorityToStore(priority: Priority): ResultOrError<Priority> {
    const state = store.getState();

    if (hasDuplicatePriorityId(state, priority)) {
        return handleDuplicatePriorityId(priority);
    }

    updateStateWithNewPriority(state, priority);

    logger.debug('addPriority:', priority);

    return { result: priority };
}

export const addPriority = createStoreMethod<Priority>(validatePriority, addPriorityToStore);