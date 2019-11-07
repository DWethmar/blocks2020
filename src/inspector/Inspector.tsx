import * as React from 'react';
import { throttleTime, map } from 'rxjs/operators';

import { Engine } from '../game/engine/engine';
import { GameState } from '../game/engine/game-state';
import { Component } from '../game/engine/component';
import { GameObject } from '../game/engine/game-object';

export interface InspectorProps {
    engine: Engine;
}

export const Inspector: React.FunctionComponent<InspectorProps> = ({ engine }) => {
    const [gameState, setGameState] = React.useState<GameState>();
    const [selectedId, setSelectedId] = React.useState<string>();
    const [selected, setSelected] = React.useState<[GameObject, Component<any>[]]>();

    const onChange = engine
        .onChange()
        .pipe(
            throttleTime(1500)
        );

    React.useEffect(() => {
        const gameStateSubscription = onChange.subscribe((state: GameState) => {
            setGameState(state);
        });
        return () => gameStateSubscription.unsubscribe();
    });

    // React.useEffect(() => {
    //     const gameObjectSubscription = onChange.pipe(
    //         map(() => engine.getGameObjectAndComponents(selectedId))
    //     ).subscribe(([gameObject, Components]) => {
    //         setSelected([gameObject, Components]);
    //     });
    //     return () => gameObjectSubscription.unsubscribe();
    // });

    return gameState
        ? (
            <div className="inspector">
                <div className="inspector__game-objects">
                    <h1>Game Objects</h1>
                    <ul className="game-objects-list">
                        {
                            Object.values(gameState.gameObjects).map(
                                (gameObject, index) => (
                                    <li className="game-objects-list__item" key={index}>
                                        <button
                                            className={gameObject.id === selectedId ? 'selected' : ''}
                                            onClick={() => setSelectedId(gameObject.id)}
                                        >{gameObject.name}</button>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
                <div className="inspector__selected">
                    {JSON.stringify(selected, null, 4)}
                </div>
            </div>
        )
        : <span>loading...</span>;
};
