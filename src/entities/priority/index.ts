import type { LikeExtended, FieldsValidators, ValidateEntity } from '@budarin/validate.ts';
import { hexColorvalidator, isInteger, mustBeInt, validateEntity } from '@budarin/validate.ts';
import type { Id } from '../types.ts';

export type PriorityId = Id;
export type PriorityTitle = PiorityLow | PiorityNormal | PiorityAboveNormal | PiorityHigh;
export type PriorityColor = string;
export type Priority = {
    priority_id: PriorityId;
    priority_name: PriorityTitle;
    color: PriorityColor;
};

export const PRIORITY_LOW = 'низкий';
export type PiorityLow = typeof PRIORITY_LOW;
export const PRIORITY_NORMAL = 'нормальный';
export type PiorityNormal = typeof PRIORITY_NORMAL;
export const PRIORITY_ABOVE_NORMAL = 'повышенный';
export type PiorityAboveNormal = typeof PRIORITY_ABOVE_NORMAL;
export const PRIORITY_HIGH = 'высокий';
export type PiorityHigh = typeof PRIORITY_HIGH;
export const PRIORITIES = [PRIORITY_LOW, PRIORITY_NORMAL, PRIORITY_ABOVE_NORMAL, PRIORITY_HIGH];

// const prioritySchema: JSONSchemaType<Priority> = {
//     $id: 'https://budarin/MyTasks/taskPriority.json',
//
//     type: 'object',
//
//     properties: {
//         priority_id: {
//             type: 'integer',
//         },
//
//         priority_name: {
//             type: 'string',
//             enum: [],
//         },
//
//         color: {
//             type: 'string',
//             format: 'hex-color',
//         },
//     },
//
//     required: ['priority_id', 'priority_name', 'color'],
// };

function getPriority(obj: LikeExtended<Priority>): Readonly<Priority> {
    const { priority_id, priority_name, color } = obj;

    return { priority_id, priority_name, color };
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
    color: {
        validators: [hexColorvalidator(entityName)],
        required: true,
    },
};

export const validatePriority: ValidateEntity<Priority> = (data) =>
    validateEntity(data, priorityFields, getPriority, entityName);
