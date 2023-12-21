# tasks-domain

Contains a description of the entities

-   icon
-   priority
-   task category
-   task

their types, constructors, object extraction and validation methods.

It also describes the structure of storing entities in the application state store and methods for changing them for reuse in various applications.

## Install

```bash
yarn add @budarin/tasks-domain
```

## Usage

```ts
import type { TasksStoreState } from '@budarin/tasks-domain';
import { tasksStoreState, initTasksStore } from '@budarin/tasks-domain';

import { storeLogger } from '../app/providers';
import { INBOX_KEY, OVERDUE_KEY, RECYCLE_BIN_KEY } from '../app/entities/index.ts';

type AppState = TasksStoreState && SomeOtherState;

useAppStore = create<AppState>()({
    ...tasksStoreState,

    navigationFilter: {...},

    tasks: {
        ...tasksStoreState.tasks,

        idsByDueDate: {},
        idsByCategoryId: {},
        idsByFilterId: {
            [INBOX_KEY]: [],
            [RECYCLE_BIN_KEY]: [],
            [OVERDUE_KEY]: [],
        },
    },
});

// you need to initialize store first after creating useAppStore
// with the instance of real store for using in entities methods and with the logger for store
initTasksStore(useAppStore, storeLogger);
```

extending domain store logic in use cases

```ts
import { addTask, createTask } from '@budarin/tasks-domain';

function storeAddTask(task: unknown): ResultOrError<Task> {
    const addResult = addTask(task);

    if (addResult.error) {
        return addResult;
    }

    const state = useAppStore.getState();
    // additional logic for managing filters & categories
    {...}
}

// using extended logic
storeAddTask(createTask({
    taskId: 1,
    title: 'TaskTitle',
    priorityId: 1,
    deleted: false,
    completed: false,
}))

```

## License

MIT
