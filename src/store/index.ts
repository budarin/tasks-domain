import type { StoreApi, UseBoundStore } from 'zustand';
import { createServiceStub } from '@budarin/service-stub';

import type { Id, Timestamp } from '../entities/types.js';
import type { Category, Icon, Priority, Task } from '../entities/index.js';

export const tasksStoreFields = {
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
              due_date_time: string;
              due_date_ts: Timestamp;
              due_date_time_ts: Timestamp;
          }
        | {
              due_date_time?: never;
              due_date_ts?: never;
              due_date_time_ts?: never;
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

export let store: TasksStore = createServiceStub('Попытка использовать tasksStore до его инициализации!') as TasksStore;

interface Logger {
    info: (...data: unknown[]) => void;
    warn: (...data: unknown[]) => void;
    error: (...data: unknown[]) => void;
    debug: (...data: unknown[]) => void;
}

export let logger: Logger = createServiceStub('Попытка использовать logger до его инициализации!') as unknown as Logger;

interface ExtendedState {
    [key: string]: any;
}

export function initTasksStore(
    tasksStore: UseBoundStore<StoreApi<TasksStoreState & ExtendedState>>,
    taskLogger: Logger,
): void {
    store = tasksStore;
    logger = taskLogger;
}
