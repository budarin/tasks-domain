import type { Id } from '../types.ts';
import type { LikeExtended, FieldsValidators, ValidateEntity, DeepReadonly } from '@budarin/validate.ts';

import {
    isBoolean,
    isISODateTimeString,
    isInteger,
    isStringWithLength,
    isUndefinedOr,
    mustBeInt,
    mustBeUndefinedOrBoolean,
    mustBeUndefinedOrInt,
    stringHasWrongLength,
    validateEntity,
} from '@budarin/validate.ts';

export type TaskId = Id;
export type TaskTitle = string;
export type TaskPriorityId = Id;
export type TaskCategoryId = Id | undefined;
export type TaskDescription = string | undefined;
export type TaskExpireDateTime = string | undefined;
export type TaskDeleted = boolean | undefined;
export type TaskCompleted = boolean | undefined;

export type NewTask = {
    title: TaskTitle;
    priority_id: TaskPriorityId;
    category_id?: TaskCategoryId;
    description?: TaskDescription;
    expire_date_time?: TaskExpireDateTime;
    deleted?: TaskDeleted;
    completed?: TaskCompleted;
};

export type Task = {
    task_id: TaskId;
} & NewTask;

const entityName = 'Задача';
const title_min_length = 3;
const title_max_length = 100;
const description_min_length = 3;
const description_max_length = 1000;

export const taskFormFieldsProps = {
    task_id: {
        type: 'number',
        min: 1,
        required: true,
    },
    title: {
        type: 'text',
        minLength: title_min_length,
        maxLength: title_max_length,
        required: true,
    },
    priority_id: {
        type: 'number',
        min: 1,
        required: true,
    },
    category_id: {
        type: 'number',
        min: 1,
    },
    description: {
        type: 'text',
        minLength: description_min_length,
        maxLength: description_max_length,
    },
};

// export const newTaskSchema: JSONSchemaType<NewTask> = {
//     $id: 'https://budarin/MyTasks/newTask.json',
//     type: 'object',
//
//     properties: {
//         title: {
//             type: 'string',
//         },
//
//         priority_id: {
//             type: 'integer',
//         },
//
//         category_id: {
//             type: 'integer',
//             nullable: true,
//         },
//
//         description: {
//             type: 'string',
//             nullable: true,
//         },
//
//         expire_date_time: {
//             type: 'string',
//             format: 'iso-date-date',
//             nullable: true,
//         },
//
//         deleted: {
//             type: 'boolean',
//             nullable: true,
//             default: false,
//         },
//
//         completed: {
//             type: 'boolean',
//             nullable: true,
//             default: false,
//         },
//     },
//
//     required: ['title', 'priority_id'],
// };

export function getNewTask(obj: LikeExtended<NewTask>): DeepReadonly<NewTask> {
    const { title, priority_id, category_id, description, expire_date_time, deleted, completed } = obj || {};

    return {
        title,
        priority_id: Number(priority_id),
        category_id: category_id ? Number(category_id) : undefined,
        description,
        expire_date_time,
        deleted,
        completed,
    };
}

export const createNewTask = (
    title: TaskTitle,
    priorityId: TaskPriorityId,
    categoryId?: TaskCategoryId,
    description?: TaskDescription,
    expireDateTime?: TaskExpireDateTime,
    deleted: TaskDeleted = false,
    completed: TaskCompleted = false,
): DeepReadonly<NewTask> => ({
    title,
    priority_id: priorityId,
    category_id: categoryId,
    description,
    expire_date_time: expireDateTime,
    deleted,
    completed,
});

export const newTaskFields: FieldsValidators = {
    title: {
        validators: [
            [
                isStringWithLength(title_min_length, title_max_length),
                stringHasWrongLength(entityName, 'title', title_min_length, title_max_length),
            ],
        ],
        required: true,
    },
    priority_id: {
        validators: [[isInteger, mustBeInt(entityName, 'priority_id')]],
        required: true,
    },
    category_id: {
        validators: [[isUndefinedOr(isInteger), mustBeUndefinedOrInt(entityName, 'category_id')]],
    },
    description: {
        validators: [
            [
                isUndefinedOr(isStringWithLength(description_min_length, description_max_length)),
                stringHasWrongLength(entityName, 'description', description_min_length, description_max_length),
            ],
        ],
    },
    expire_date_time: {
        validators: [
            [
                isUndefinedOr(isISODateTimeString),
                `Свойство сущности ${entityName} "expire_date_time" должно быть датой в формате ISO`,
            ],
        ],
    },
    deleted: {
        validators: [[isUndefinedOr(isBoolean), mustBeUndefinedOrBoolean(entityName, 'deleted')]],
    },
    completed: {
        validators: [[isUndefinedOr(isBoolean), mustBeUndefinedOrBoolean(entityName, 'completed')]],
    },
};

export const validateNewTask: ValidateEntity<NewTask> = (data) =>
    validateEntity(data, newTaskFields, getNewTask, entityName);

// export const taskSchema: JSONSchemaType<Task> = {
//     $id: 'https://budarin/MyTasks/newTask.json',
//     type: 'object',
//
//     properties: {
//         task_id: {
//             type: 'integer',
//         },
//
//         title: {
//             type: 'string',
//         },
//
//         priority_id: {
//             type: 'integer',
//         },
//
//         category_id: {
//             type: 'integer',
//             nullable: true,
//         },
//
//         description: {
//             type: 'string',
//             nullable: true,
//         },
//
//         expire_date_time: {
//             type: 'string',
//             format: 'iso-date-date',
//             nullable: true,
//         },
//
//         deleted: {
//             type: 'boolean',
//             nullable: true,
//             default: false,
//         },
//
//         completed: {
//             type: 'boolean',
//             nullable: true,
//             default: false,
//         },
//     },
//
//     required: ['task_id', 'title', 'priority_id'],
// };

export function getTask(obj: LikeExtended<Task>): DeepReadonly<Task> {
    const { task_id, title, priority_id, category_id, description, expire_date_time, deleted, completed } = obj || {};

    return {
        task_id: Number(task_id),
        title,
        priority_id: Number(priority_id),
        category_id: category_id ? Number(category_id) : undefined,
        description,
        expire_date_time,
        deleted,
        completed,
    };
}

export const createTask = (
    taskId: TaskId,
    title: TaskTitle,
    priorityId: TaskPriorityId,
    categoryId?: TaskCategoryId,
    description?: TaskDescription,
    expireDateTime?: TaskExpireDateTime,
    deleted: TaskDeleted = false,
    completed: TaskCompleted = false,
): DeepReadonly<Task> => ({
    task_id: taskId,
    title,
    priority_id: priorityId,
    category_id: categoryId,
    description,
    expire_date_time: expireDateTime,
    deleted,
    completed,
});

const taskFields: FieldsValidators = {
    task_id: {
        validators: [[isInteger, mustBeInt(entityName, 'task_id')]],
        required: true,
    },
    ...newTaskFields,
};

export const validateTask: ValidateEntity<Task> = (data) => validateEntity(data, taskFields, getTask, entityName);
