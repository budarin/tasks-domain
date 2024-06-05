import type { DeepReadonly, ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Priority } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { handleError } from '../_helpers/handleError.js';
import { validatePriority } from '../../entities/index.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';

function hasDuplicatePriorityId(state: TasksStoreState, priority: Priority): boolean {
    return Boolean(state.priorities.ids.indexOf(priority.priority_id) > -1);
}

export function hasDuplicatePriorityName(state: TasksStoreState, priority: Priority): boolean {
    for (const id in state.priorities.byId) {
        if (state.priorities.byId[id].priority_name === priority.priority_name) {
            return true;
        }
    }
    return false;
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

function addPriorityToStore(priority: Priority): DeepReadonly<ResultOrError<Priority>> {
    logger.debug('addPriority:', priority);

    const state = store.getState();

    if (hasDuplicatePriorityId(state, priority)) {
        return handleError(priority, 'Добавление дубликата приоритета');
    }

    if (hasDuplicatePriorityName(state, priority)) {
        return handleError(priority, 'Добавление приоритета с уже существующим именем');
    }

    const nextState = updateStateWithNewPriority(state, priority);

    if (nextState !== state) {
        store.setState(nextState);
    }

    return Object.freeze({ result: priority });
}

export const addPriority = createStoreMethod<Priority>(validatePriority, addPriorityToStore);
