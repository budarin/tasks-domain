import { DeepReadonly, Like, ResultOrError, ValidateEntity } from '@budarin/validate.ts';

import { logger } from '../index.js';

export interface StoreMethod<T> {
    (obj: Like<T>): DeepReadonly<ResultOrError<T>>;
}

export function createStoreMethod<T>(
    validateFn: ValidateEntity<T>,
    entityMethod: (entity: T) => DeepReadonly<ResultOrError<T>>,
): StoreMethod<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function storeMethod(obj: any): DeepReadonly<ResultOrError<T>> {
        const result = validateFn(obj);

        if (result.error) {
            logger.error(result.error.message, result.error.data);

            return result;
        }

        return entityMethod(obj as T);
    };
}
