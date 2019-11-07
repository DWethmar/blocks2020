import * as React from 'react';
import { GameObject } from '../game/engine/game-object';

export const GameObjectView: React.FunctionComponent<GameObject> = (gameObject) => {
    return (
        <div>
            <div>{gameObject.id}</div>
            <div>{gameObject.name}</div>
        </div>
    );
};
