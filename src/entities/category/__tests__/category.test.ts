import { initAppServices } from 'app/initAppServices.ts';
import {
    createCategory,
    createNewCategory,
    validateNewCategory,
    validateCategory,
} from '../index.ts';

describe('Domain', () => {
    beforeAll(() => {
        initAppServices();
    });

    describe('NewCategory', () => {
        it('конструктор должен возвращать валидный объект, описанный в схеме', () => {
            const newCategory = createNewCategory(1, 'Спорт');
            const isValid = validateNewCategory(newCategory);

            expect(isValid).toBe(true);
        });
    });

    describe('Category', () => {
        it('конструктор должен возвращать валидный объект, описанный в схеме', () => {
            const category = createCategory(1, 1, 'Спорт');
            const isValid = validateCategory(category);

            expect(isValid).toBe(true);
        });
    });
});
