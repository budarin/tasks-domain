import type { DeepReadonly, ResultOrError } from '@budarin/validate.ts';

import type { TasksStoreState } from '../index.ts';
import type { Icon } from '../../entities/index.ts';

import { logger, store } from '../index.js';
import { validateIcon } from '../../entities/index.js';
import { handleError } from '../_helpers/handleError.js';
import { createStoreMethod } from '../_helpers/createStoreMethod.js';

function hasDuplicateIconId(state: TasksStoreState, icon: Icon): boolean {
    return Boolean(state.icons.ids.indexOf(icon.icon_id) > -1);
}

export function hasDuplicateIconFileName(state: TasksStoreState, icon: Icon): boolean {
    for (const id in state.icons.byId) {
        if (state.icons.byId[id].file_name === icon.file_name) {
            return true;
        }
    }
    return false;
}

function updateStateWithNewIcon(state: TasksStoreState, icon: Icon): TasksStoreState {
    const { icon_id } = icon;

    return {
        ...state,
        icons: {
            ...state.icons,

            ids: [...state.icons.ids, icon_id],

            byId: {
                ...state.icons.byId,
                [icon_id]: icon,
            },
        },
    };
}

function addIconToStore(icon: Icon): DeepReadonly<ResultOrError<Icon>> {
    logger.debug('addIcon:', icon);

    const state = store.getState();

    if (hasDuplicateIconId(state, icon)) {
        return handleError(icon, 'Добавление дубликата идентификатора иконки');
    }

    if (hasDuplicateIconFileName(state, icon)) {
        return handleError(icon, 'Добавление иконки с уже существующим именем файла иконки');
    }

    const nextState = updateStateWithNewIcon(state, icon);

    if (nextState !== state) {
        store.setState(nextState);
    }

    return Object.freeze({ result: icon });
}

export const addIcon = createStoreMethod<Icon>(validateIcon, addIconToStore);
