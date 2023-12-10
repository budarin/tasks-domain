import type { Id } from '../types.js';

import { PiorityAboveNormal, PiorityHigh, PiorityLow, PiorityNormal } from './index.js';

export type PriorityId = Id;
export type PriorityTitle = PiorityLow | PiorityNormal | PiorityAboveNormal | PiorityHigh;
export type PriorityColor = string;

export type Priority = {
    priority_id: PriorityId;
    priority_name: PriorityTitle;
    color: PriorityColor;
};
