import type { StoreApi, UseBoundStore } from 'zustand';
import type { Id, Timestamp } from '../entities/types.ts';
import type { Category, Icon, Priority, Task } from '../entities/index.ts';

import { createServiceStub } from '@budarin/service-stub';

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
export let store: TasksStore = createServiceStub(
    'Попытка использовать TasksStore до его инициализации!',
) as unknown as TasksStore;

interface Logger {
    info: (...data: unknown[]) => void;
    warn: (...data: unknown[]) => void;
    error: (...data: unknown[]) => void;
    debug: (...data: unknown[]) => void;
}

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
}
