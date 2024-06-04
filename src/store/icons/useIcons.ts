import { useShallow } from 'zustand/react/shallow';

import type { DeepReadonly } from '@budarin/validate.ts';
import type { Icon } from '../../entities/index.js';
import type { TasksStoreState } from '../index.js';

import { store } from '../index.js';

export const useIcons = (): DeepReadonly<Icon[]> => {
    const selector = (state: TasksStoreState) => Object.values(state.icons.byId);

    return Object.freeze(store(useShallow(selector)));
};
