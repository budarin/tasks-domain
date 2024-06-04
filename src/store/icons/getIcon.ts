import type { DeepReadonly } from '@budarin/validate.ts';
import type { Icon, IconId } from '../../entities/index.js';

import { store } from '../index.js';

export const getIcon = (id?: IconId): DeepReadonly<Icon> | undefined => {
    if (!id) {
        return;
    }

    const priority = store.getState().icons.byId[id];

    return Object.freeze(priority);
};
