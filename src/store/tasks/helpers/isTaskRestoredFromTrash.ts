import type { ExtendedTask } from '../../index.ts';
import type { Task } from '../../../entities/index.ts';

export function isTaskRestoredFromTrash(task: Task, prevTask: ExtendedTask): boolean {
    return prevTask && prevTask.deleted === true && task.deleted === false;
}
