import { v1 as uuidv1 } from 'uuid';

export function createUniqueId(): string {
    return uuidv1();
}
