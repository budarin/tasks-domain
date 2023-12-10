import type { ExtendedTask } from '../../index.js';
import type { Task } from '../../../entities/index.js';

export function isTaskRestoredFromTrash(task: Task, prevTask: ExtendedTask): boolean {
    return prevTask && prevTask.deleted === true && task.deleted === false;
}
