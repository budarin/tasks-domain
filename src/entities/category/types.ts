import type { Id } from '../types.js';

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
