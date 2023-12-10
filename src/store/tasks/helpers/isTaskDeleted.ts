import type { ExtendedTask } from '../../index.js';
import type { Task } from '../../../entities/index.js';

export function isTaskDeleted(task: Task, prevTask: ExtendedTask): boolean {
    return prevTask && prevTask.deleted === false && task.deleted === true;
}
