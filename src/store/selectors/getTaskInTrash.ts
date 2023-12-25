import { store } from '../index.js';

export function getTaskInTrash() {
    const { tasks } = store.getState();

    return Object.values(tasks.byId).filter((task) => task.deleted === true);
}
