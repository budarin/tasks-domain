import type { Id } from '../types.ts';

import { PiorityAboveNormal, PiorityHigh, PiorityLow, PiorityNormal } from './index.ts';

export type PriorityId = Id;
export type PriorityTitle = PiorityLow | PiorityNormal | PiorityAboveNormal | PiorityHigh;
export type PriorityColor = string;

export type Priority = {
    priority_id: PriorityId;
    priority_name: PriorityTitle;
    color: PriorityColor;
};
