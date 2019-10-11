import { Action } from './action';

export enum GameObjectActions {
    CREATE_GAME_OBJECT = 'CREATE_GAME_OBJECT',
    DESTROY_GAME_OBJECT = 'CREATE_GAME_OBJECT'
};

export class CreateGameObject implements Action {
    type = GameObjectActions.CREATE_GAME_OBJECT;

    constructor(public payload: { id: string }) { }
}

export class DestroyGameObject implements Action {
    type = GameObjectActions.DESTROY_GAME_OBJECT;
    constructor(public payload: { id: string }) { }
}

export type actions = CreateGameObject | DestroyGameObject;
