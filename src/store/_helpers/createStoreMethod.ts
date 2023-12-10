import type { ResultOrError } from 'domain/types.ts';
import type { Like, ValidateEntity } from 'entities/index.ts';

export interface StoreMethod<T> {
    (obj: Like<T>): ResultOrError<T>;
}

export function createStoreMethod<T>(
    validateFn: ValidateEntity<T>,
    entityMethod: (entity: T) => ResultOrError<T>,
): StoreMethod<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function storeMethod(obj: any): ResultOrError<T> {
        const result = validateFn(obj);

        if (result.error) {
            return result;
        }

        return entityMethod(obj as T);
    };
}
