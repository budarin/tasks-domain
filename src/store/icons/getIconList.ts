import type { DeepReadonly } from '@budarin/validate.ts';
import type { IconId } from '../../entities/index.js';

import { store } from '../index.js';

export const getIconList = (): DeepReadonly<IconId[]> => {
    const task = store.getState().icons.ids;

    return Object.freeze(task);
};
