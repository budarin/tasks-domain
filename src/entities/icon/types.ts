import type { Id } from '../types.js';

export type IconId = Id;
export type IconName = string;

export type Icon = {
    icon_id: IconId;
    file_name: IconName;
};

export type IconKeys = keyof Icon;
