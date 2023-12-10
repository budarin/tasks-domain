import { validatePriority } from '../index.ts';
import type { Priority, PriorityColor, PriorityId, PriorityTitle } from '../types.ts';

function createPriority(priorityId: PriorityId, priorityName: PriorityTitle, color: PriorityColor): Priority {
    return {
        priority_id: priorityId,
        priority_name: priorityName,
        color,
    };
}

describe('Domain', () => {
    beforeAll(() => {
        //
    });

    describe('Priority', () => {
        it('конструктор должен возвращать валидный объект, описанный в схеме', () => {
            const priority = createPriority(1, 'низкий', '#000fff');
            const isValid = validatePriority(priority);

            expect(isValid).toBe(true);
        });
    });
});
