import type { DeepReadonly } from '@budarin/validate.ts';
import type { Icon } from '../../entities/index.js';

import { store } from '../index.js';

export const getIcons = (): DeepReadonly<Icon[]> => {
    return Object.freeze(Object.values(store.getState().icons.byId));
};
