export enum ComponentType {
    POSITION = 'POSITION',
    SPRITE = 'SPRITE',
    MOVEMENT_CONTROLS = 'MOVEMENT_CONTROLS',
}

export interface Component<T> {
    id: string;
    gameObjectId: string;
    type: ComponentType;
    state: T;
}
