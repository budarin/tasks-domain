import type { Id } from '../_helpers/types.ts';

export type IconId = Id;
export type IconName = string;

export type Icon = {
    icon_id: IconId;
    file_name: IconName;
};

export type IconKeys = keyof Icon;
