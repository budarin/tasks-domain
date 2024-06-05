import type { DeepReadonly } from '@budarin/validate.ts';
import type { TasksStoreState } from '../index.js';
import type { IconId } from '../../entities/index.js';

import { store } from '../index.js';

const selector = (state: TasksStoreState) => state.icons.ids;

export const useIconList = (): DeepReadonly<IconId[]> => {
    return Object.freeze(store(selector));
};
