import type { FieldsValidators, LikeExtended, ValidateEntity } from '@budarin/validate.ts';
import type { Icon } from './types.ts';

import { isInteger, isStringWithLength, mustBeInt, stringHasWrongLength, validateEntity } from '@budarin/validate.ts';

// const iconSchema: JSONSchemaType<Icon> = {
//     $id: 'https://budarin/MyTasks/categoryIcon.json',
//     type: 'object',
//
//     properties: {
//         icon_id: {
//             type: 'integer',
//         },
//
//         file_name: {
//             type: 'string',
//             minLength: 5,
//             maxLength: 20,
//         },
//     },
//
//     required: ['icon_id', 'file_name'],
// };

function getIcon(obj: LikeExtended<Icon>): Readonly<Icon> {
    return {
        icon_id: obj.icon_id,
        file_name: obj.file_name,
    };
}

const entityName = 'Иконка';
const icon_file_name_min_Length = 3;
const icon_file_name_max_length = 20;

const iconFields: FieldsValidators = {
    icon_id: {
        validators: [[isInteger, mustBeInt(entityName, 'icon_id')]],
        required: true,
    },
    file_name: {
        validators: [
            [
                isStringWithLength(icon_file_name_min_Length, icon_file_name_max_length),
                stringHasWrongLength(entityName, 'fole_name', icon_file_name_min_Length, icon_file_name_max_length),
            ],
        ],
        required: true,
    },
};

export const validateIcon: ValidateEntity<Icon> = (data) => validateEntity(data, iconFields, getIcon, entityName);
