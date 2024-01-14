import { store } from '../index.js';

export function getDeletedTasks() {
    const { tasks } = store.getState();

    return Object.values(tasks.byId).filter((task) => task.deleted === true);
}
