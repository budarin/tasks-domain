import { createServiceStub } from '@budarin/service-stub';

import type { StoreApi, UseBoundStore } from 'zustand';
import type { Id, Timestamp } from '../entities/types.js';
import type { Category, Icon, Priority, Task } from '../entities/index.js';

export const tasksStoreState = {
    icons: {
        byId: {},
        ids: [],
    },

    priorities: {
        byId: {},
        ids: [],
    },

    categories: {
        byId: {},
        ids: [],
    },

    tasks: {
        byId: {},
        ids: [],
    },
};

type IconById = Record<Id, Icon>;
export type IconState = {
    byId: IconById;
    ids: Id[];
};

type PriorityById = Record<Id, Priority>;
export type PriorityState = {
    byId: PriorityById;
    ids: Id[];
};

type CategoryById = Record<Id, Category>;
export type CategoryState = {
    byId: CategoryById;
    ids: Id[];
};

// TasksState
export type ExtendedTask = Task &
    (
        | {
              expire_date_time: string;
              expire_date_ts: Timestamp;
              expire_date_time_ts: Timestamp;
          }
        | {
              expire_date_time?: never;
              expire_date_ts?: never;
              expire_date_time_ts?: never;
          }
    );

type TaskIds = Id[];
type TaskById = Record<Id, ExtendedTask>;

export type TasksState = {
    byId: TaskById;
    ids: TaskIds;
};

// AppState
export type TasksStoreState = {
    icons: IconState;
    priorities: PriorityState;
    categories: CategoryState;
    tasks: TasksState;
};

export type TasksStore = UseBoundStore<StoreApi<TasksStoreState>>;

// inner variable
export let store: TasksStore = createServiceStub(
    'Попытка использовать TasksStore до его инициализации!',
) as unknown as TasksStore;

interface Logger {
    info: (...data: unknown[]) => void;
    warn: (...data: unknown[]) => void;
    error: (...data: unknown[]) => void;
    debug: (...data: unknown[]) => void;
}

// inner variable
export let logger: Logger = createServiceStub(
    'Попытка использовать logger в TasksStore до его инициализации!',
) as unknown as Logger;

interface ExtendedState {
    [key: string]: any;
}
export function initTasksStore(
    tasksStore: UseBoundStore<StoreApi<TasksStoreState & ExtendedState>>,
    taskLogger: Logger,
): void {
    store = tasksStore;
    logger = taskLogger;

    logger.debug('Доменное хранилище инициализировано', store.getState());
}
