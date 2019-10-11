export enum ComponentType {
    POSITION = 'POSITION',
    SPRITE = 'SPRITE',
}

export interface Component<T> {
    id: string;
    gameObjectId: string;
    type: ComponentType;
    state: T;
}
