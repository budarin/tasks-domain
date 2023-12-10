import { validateTask, validateNewTask, createNewTask, createTask } from '../index.ts';

describe('Domain', () => {
    beforeAll(() => {});

    describe('NewTask', () => {
        it('конструктор должен возвращать валидный объект, описанный в схеме', () => {
            const newTask = createNewTask(
                'Новая задача',
                1,
                1,
                'Проверка новой задачи',
                '2023-09-28T16:24:04.219Z',
                false,
                true,
            );
            const isValid = validateNewTask(newTask);

            expect(isValid).toBe(true);
        });

        it('конструктор должен возвращать валидный не полный объект, описанный в схеме', () => {
            const newTask = createNewTask('Новая не полная задача', 1, 1);
            const isValid = validateNewTask(newTask);

            expect(isValid).toBe(true);
        });
    });

    describe('Task', () => {
        it('конструктор должен возвращать валидный объект, описанный в схеме', () => {
            const task = createTask(
                1,
                'Задача с полным описанием',
                1,
                1,
                'Проверка задачи',
                '2023-09-28T16:24:04.219Z',
                false,
                false,
            );
            const isValid = validateTask(task);

            expect(isValid).toBe(true);
        });

        it('конструктор должен возвращать валидный не полный объект, описанный в схеме', () => {
            const task = createTask(1, 'Задача с не полным описанием', 1, 1);
            const isValid = validateTask(task);

            expect(isValid).toBe(true);
        });
    });
});
