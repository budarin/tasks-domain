import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Priority } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validatePriority } from '../../entities/index.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';

function hasDuplicatePriorityId(state: TasksStoreState, priority: Priority): boolean {
    return Boolean(state.priorities.ids.indexOf(priority.priority_id) > -1);
}

const ERROR_MSG = 'Добавление дубликата приоритета';

function handleDuplicatePriorityId(priority: Priority): ResultOrError<Priority> {
    logger.error(ERROR_MSG, priority);

    return {
        error: {
            message: ERROR_MSG,
            data: priority,
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
    logger.error(ERROR_MSG, priority);

    return {
        error: {
            message: ERROR_MSG,
            data: priority,
        },
    };
}

function updateStateWithNewPriority(state: TasksStoreState, priority: Priority): TasksStoreState {
    const { priority_id } = priority;

    return {
        ...state,

        priorities: {
            ...state.priorities,

            ids: [...state.priorities.ids, priority_id],

            byId: {
                ...state.priorities.byId,
                [priority_id]: priority,
            },
        },
    };
}

function addPriorityToStore(priority: Priority): ResultOrError<Priority> {
    const state = store.getState();

    if (hasDuplicatePriorityId(state, priority)) {
        return handleDuplicatePriorityId(priority);
    }

    const newState = updateStateWithNewPriority(state, priority);
    
    if (newState !== state) {
        store.setState(newState);
        logger.debug('addPriority:', priority, store.getState());
    }

    return { result: priority };
}

export const addPriority = createStoreMethod<Priority>(validatePriority, addPriorityToStore);
