import type { Id } from '../types.ts';
import type { FieldsValidators, LikeExtended, LikeType, ValidateEntity } from '@budarin/validate.ts';

import { isInteger, isStringWithLength, mustBeInt, stringHasWrongLength, validateEntity } from '@budarin/validate.ts';

export type IconId = Id;
export type IconName = string;
export type Icon = {
    icon_id: IconId;
    file_name: IconName;
};
export type IconKeys = keyof Icon;

// Icon - runtime validation

function getIcon(obj: LikeExtended<Icon>): LikeType<Icon> {
    const { icon_id, file_name } = obj || {};

    return {
        icon_id: Number(icon_id),
        file_name,
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
