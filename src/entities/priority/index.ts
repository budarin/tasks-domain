import type { Id } from '../types.ts';
import type {
    LikeExtended,
    FieldsValidators,
    ValidateEntity,
    LikeType,
} from '@budarin/validate.ts';

import { isInteger, mustBeInt, validateEntity } from '@budarin/validate.ts';

export type PriorityId = Id;
export type PriorityTitle = PiorityNormal | PiorityAboveNormal | PiorityHigh;
export type Priority = {
    priority_id: PriorityId;
    priority_name: PriorityTitle;
};

export const PRIORITY_NORMAL = 'обычный';
export const PRIORITY_ABOVE_NORMAL = 'повышенный';
export const PRIORITY_HIGH = 'высокий';
export const PRIORITIES = [PRIORITY_NORMAL, PRIORITY_ABOVE_NORMAL, PRIORITY_HIGH];

export type PiorityNormal = typeof PRIORITY_NORMAL;
export type PiorityAboveNormal = typeof PRIORITY_ABOVE_NORMAL;
export type PiorityHigh = typeof PRIORITY_HIGH;

// Priority - runtime validation

function extractPriority(obj: LikeExtended<Priority>): LikeType<Priority> {
    const { priority_id, priority_name } = obj || {};

    return { priority_id: Number(priority_id), priority_name };
}

const entityName = 'Приоритет';
const priorityFields: FieldsValidators = {
    priority_id: {
        validators: [[isInteger, mustBeInt(entityName, 'priority_id')]],
        required: true,
    },
    priority_name: {
        validators: [
            [
                (str: string): boolean => PRIORITIES.includes(str),
                `Свойство сущности ${entityName} "priority_name" должно быть одним из ${JSON.stringify(PRIORITIES)}`,
            ],
        ],
        required: true,
    },
};

export const validatePriority: ValidateEntity<Priority> = (data) =>
    validateEntity(data, priorityFields, extractPriority, entityName);
