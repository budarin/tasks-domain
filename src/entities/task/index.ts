import type { Id } from '../types.ts';
import type { LikeExtended, FieldsValidators, ValidateEntity, DeepReadonly, LikeType } from '@budarin/validate.ts';

import {
    isString,
    isBoolean,
    isInteger,
    mustBeInt,
    mustBeString,
    isUndefinedOr,
    validateEntity,
    isStringWithLength,
    isISODateTimeString,
    mustBeUndefinedOrInt,
    stringHasWrongLength,
    mustBeUndefinedOrBoolean,
} from '@budarin/validate.ts';

import { getOnInvalid, onInput } from '../../helpers/consts.js';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter.js';

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

const tsakTitle = 'Название задачи';

export const taskFormFieldsProps = {
    task_id: {
        title: 'Идентификатор задачи',
        name: 'task_id',
        required: true,
    },
    task_date: {
        title: 'Дата выполнения задачи',
        name: 'task_date',
        type: 'date',
    },
    task_time: {
        title: 'Время выполнения задачи',
        name: 'task_time',
        type: 'time',
    },
    title: {
        title: tsakTitle,
        name: 'title',
        type: 'text',
        pattern: `^[a-zA-Zа-яА-Я0-9]{${title_min_length}}.*`,
        required: true,
        minLength: title_min_length,
        maxLength: title_max_length,
        placeholder: tsakTitle,
        autoComplete: 'off',
        spellCheck: false,
        onInput,
        onInvalid: getOnInvalid(tsakTitle, title_min_length, title_max_length),
    },
    priority_id: {
        title: 'Идентификатор приоритета',
        name: 'priority_id',
        required: true,
    },
    category_id: {
        title: 'Идентификатор категории',
        name: 'category_id',
    },
    description: {
        title: 'Описание задачи',
        name: 'description',
        placeholder: 'Подробное описание задачи',
        maxLength: 500,
    },
};

export type TaskFormFieldsProps = typeof taskFormFieldsProps;

// NewTask - runtime validation

export function extractNewTask(obj: LikeExtended<NewTask>): LikeType<NewTask> {
    const { title, priority_id, category_id, description, expire_date_time, deleted, completed } = obj || {};

    return {
        title: capitalizeFirstLetter(title.trim()),
        priority_id: Number(priority_id),
        category_id: category_id ? Number(category_id) : undefined,
        description: description?.replace(/\s*\n+\s*$/, '').trim(),
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
    expire_date_time: {
        validators: [
            [isUndefinedOr(isString), mustBeString(entityName, 'expire_date_time')],
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
    validateEntity(data, newTaskFields, extractNewTask, entityName);

// Task - runtime validation

export function extractTask(obj: LikeExtended<Task>): LikeType<Task> {
    const { task_id, title, priority_id, category_id, description, expire_date_time, deleted, completed } = obj || {};

    return {
        task_id: Number(task_id),
        title: capitalizeFirstLetter(title.trim()),
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

export const validateTask: ValidateEntity<Task> = (data) => validateEntity(data, taskFields, extractTask, entityName);
