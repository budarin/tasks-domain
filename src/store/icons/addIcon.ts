import type { ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.js';
import type { Icon } from '../../entities/index.js';

import { logger, store } from '../index.js';
import { validateIcon } from '../../entities/index.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';

function hasDuplicateIconId(state: TasksStoreState, icon: Icon): boolean {
    return Boolean(state.icons.ids.indexOf(icon.icon_id) > -1);
}

const ERROR_MSG = 'Добавление дубликата иконки';

function handleDuplicateIconId(icon: Icon): ResultOrError<Icon> {
    return {
        error: {
            message: `${ERROR_MSG}: ${icon.icon_id}`,
        },
    };
}

export function hasDuplicateIconFileName(state: TasksStoreState, icon: Icon): boolean {
    for (const id in state.icons.byId) {
        if (state.icons.byId[id].file_name === icon.file_name) {
            return true;
        }
    }
    return false;
}

export function handleDuplicateIconFileName(icon: Icon): ResultOrError<Icon> {
    return {
        error: {
            message: `${ERROR_MSG}: ${icon.file_name}`,
        },
    };
}

function updateStateWithNewIcon(state: TasksStoreState, icon: Icon): void {
    const { icon_id } = icon;

    store.setState({
        ...state,
        icons: {
            ...state.icons,
            ids: [...state.icons.ids, icon_id],
            byId: { ...state.icons.byId, [icon_id]: icon },
        },
    });
}

function addIconToStore(icon: Icon): ResultOrError<Icon> {
    const state = store.getState();

    if (hasDuplicateIconId(state, icon)) {
        return handleDuplicateIconId(icon);
    }

    if (hasDuplicateIconFileName(state, icon)) {
        return handleDuplicateIconFileName(icon);
    }

    updateStateWithNewIcon(state, icon);

    logger.debug('addIcon:', icon);

    return { result: icon };
}

export const addIcon = createStoreMethod<Icon>(validateIcon, addIconToStore);