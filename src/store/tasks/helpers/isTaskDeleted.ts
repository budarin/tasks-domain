import type { ExtendedTask } from '../../index.ts';
import type { Task } from '../../../entities/index.ts';

export function isTaskDeleted(task: Task, prevTask: ExtendedTask): boolean {
    return prevTask && prevTask.deleted === false && task.deleted === true;
}
