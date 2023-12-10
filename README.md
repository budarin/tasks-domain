# tasks-domain

Задача: описать, хранить и использовать многократно в разных проектах сущности для обработки Задач.

## Install

```bash
yarn add @budarin/tasks-domain
```

## Usage

```ts
import type { TasksStoreState } from '@budarin/tasks-domain';
import { tasksStoreFields, initTasksStore, addTask, createTask } from '@budarin/tasks-domain';

import { storeLogger } from './services';
import { INBOX_KEY, OVERDUE_KEY, RECYCLE_BIN_KEY } from 'entities/index.ts';

useAppStore = create<TasksStoreState && SomeState>()({
    ...tasksStoreFields,

    navigationFilter: {...},

    tasks: {
        ...tasksStoreFields.tasks,

        idsByDueDate: {},
        idsByCategoryId: {},
        idsByFilterId: {
            [INBOX_KEY]: [],
            [RECYCLE_BIN_KEY]: [],
            [OVERDUE_KEY]: [],
        },
    },
});

initTasksStore(useAppStore, storeLogger);

function storeAddTask(task: unknown): ResultOrError<Task> {
    const addResult = addTask(task);

    if (addResult.error) {
        return addResult;
    }

    const state = useAppStore.getState();
    // additional logic for managing filters
    {...}
}


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
