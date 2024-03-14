import type { Id } from '../types.ts';
import type { DeepReadonly, LikeExtended, FieldsValidators, ValidateEntity } from '@budarin/validate.ts';

import { isInteger, mustBeInt, isStringWithLength, stringHasWrongLength, validateEntity } from '@budarin/validate.ts';

export type CategoryId = Id;
export type CategoryIconId = Id;
export type CategoryName = string;

export type NewCategory = {
    icon_id: CategoryIconId;
    category_name: CategoryName;
};

export type Category = {
    category_id: CategoryId;
} & NewCategory;

// const newCategorySchema = {
//     $id: 'https://budarin/MyTasks/newTaskCategory.json',
//     type: 'object',
//     properties: {
//         icon_id: {
//             type: 'integer',
//         },
//
//         category_name: {
//             type: 'string',
//             minLength: 3,
//             maxLength: 20,
//         },
//     },
//     required: ['category_id', 'icon_id', 'category_name'],
// };

export function getNewCategory(obj: LikeExtended<NewCategory>): DeepReadonly<NewCategory> {
    const { icon_id, category_name } = obj || {};

    return {
        icon_id: Number(icon_id),
        category_name,
    };
}

export const createNewCategory = (iconId: CategoryId, categoryName: CategoryName): DeepReadonly<NewCategory> => ({
    icon_id: iconId,
    category_name: categoryName,
});

const entityName = 'Категория';
const category_name_min_length = 3;
const category_name_Max_Length = 20;

const newCategoryFields: FieldsValidators = {
    icon_id: {
        validators: [[isInteger, mustBeInt(entityName, 'icon_id')]],
        required: true,
    },
    category_name: {
        validators: [
            [
                isStringWithLength(category_name_min_length, category_name_Max_Length),
                stringHasWrongLength(entityName, 'category_name', category_name_min_length, category_name_Max_Length),
            ],
        ],
        required: true,
    },
};

export const validateNewCategory: ValidateEntity<NewCategory> = (data) =>
    validateEntity(data, newCategoryFields, getNewCategory, entityName);

// const categorySchema = {
//     $id: 'https://budarin/MyTasks/newTaskCategory.json',
//     type: 'object',
//     properties: {
//         category_id: {
//             type: 'integer',
//         },
//
//         icon_id: {
//             type: 'integer',
//         },
//
//         category_name: {
//             type: 'string',
//             minLength: 3,
//             maxLength: 20,
//         },
//     },
//     required: ['category_id', 'icon_id', 'category_name'],
// };

export function getCategory(obj: LikeExtended<Category>): DeepReadonly<Category> {
    const { category_id, icon_id, category_name } = obj || {};
    return {
        category_id: Number(category_id),
        icon_id: Number(icon_id),
        category_name,
    };
}

export const createCategory = (
    categoryId: CategoryId,
    iconId: CategoryIconId,
    category: CategoryName,
): DeepReadonly<Category> => ({
    category_id: categoryId,
    icon_id: iconId,
    category_name: category,
});

const categoryFields: FieldsValidators = {
    category_id: {
        validators: [[isInteger, mustBeInt(entityName, 'category_id')]],
        required: true,
    },

    ...newCategoryFields,
};

export const validateCategory: ValidateEntity<Category> = (data) =>
    validateEntity(data, categoryFields, getCategory, entityName);
