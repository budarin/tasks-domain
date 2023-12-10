import { validateIcon } from '../index.ts';
import type { Icon, IconId, IconName } from '../types.ts';

function createIcon(iconId: IconId, fileName: IconName): Icon {
    return {
        icon_id: iconId,
        file_name: fileName,
    };
}

describe('Domain', () => {
    beforeAll(() => {
        //
    });

    describe('Icon', () => {
        it('конструктор должен возвращать валидный объект, описанный в схеме', () => {
            const icon = createIcon(1, 'some_icon');
            const isValid = validateIcon(icon);

            expect(isValid).toBe(true);
        });
    });
});
