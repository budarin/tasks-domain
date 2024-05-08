import type { Id } from '../types.ts';
import type { DeepReadonly, LikeExtended, FieldsValidators, ValidateEntity, LikeType } from '@budarin/validate.ts';

import { getOnInvalid, onInput } from '../../helpers/consts.js';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter.js';
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

const entityName = 'Категория';
const category_name_min_length = 3;
const category_name_Max_Length = 20;
const categoryTitle = 'Название категории';

export const categoryFormFieldsProps = {
    category_id: {
        title: 'Идентификатор категории',
        name: 'category_id',
        required: true,
    },
    icon_id: {
        title: 'Идентификатор иконки',
        name: 'icon_id',
        required: true,
    },
    category_name: {
        title: categoryTitle,
        name: 'category_name',
        type: 'text',
        pattern: /^[a-zA-Z0-9]{3}.*/,
        required: true,
        minLength: category_name_min_length,
        maxLength: category_name_Max_Length,
        placeholder: categoryTitle,
        autoComplete: 'off',
        onInput,
        onInvalid: getOnInvalid(categoryTitle, category_name_min_length, category_name_Max_Length),
    },
};

export type CategoryFormFieldsProps = typeof categoryFormFieldsProps;

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

export function getNewCategory(obj: LikeExtended<NewCategory>): LikeType<NewCategory> {
    const { icon_id, category_name } = obj || {};

    return {
        icon_id: Number(icon_id),
        category_name: capitalizeFirstLetter(category_name.trim()),
    };
}

export const createNewCategory = (iconId: CategoryId, categoryName: CategoryName): DeepReadonly<NewCategory> => ({
    icon_id: iconId,
    category_name: categoryName,
});

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

export function getCategory(obj: LikeExtended<Category>): LikeType<Category> {
    const { category_id, icon_id, category_name } = obj || {};
    return {
        category_id: Number(category_id),
        icon_id: Number(icon_id),
        category_name: capitalizeFirstLetter(category_name.trim()),
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
