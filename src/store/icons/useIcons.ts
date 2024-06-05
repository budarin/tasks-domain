import { useShallow } from 'zustand/react/shallow';

import type { DeepReadonly } from '@budarin/validate.ts';
import type { Icon } from '../../entities/index.js';
import type { TasksStoreState } from '../index.js';

import { store } from '../index.js';

const selector = (state: TasksStoreState) => Object.values(state.icons.byId);

export const useIcons = (): DeepReadonly<Icon[]> => {
    return Object.freeze(store(useShallow(selector)));
};
