import * as React from 'react';
import { throttleTime, map, filter, debounceTime } from 'rxjs/operators';

import { Engine } from '../game/engine/engine';
import { GameState } from '../game/engine/game-state';
import { Component } from '../game/engine/component';
import { GameObject } from '../game/engine/game-object';
import { useEffect, useState } from 'react';

export interface InspectorProps {
    engine: Engine;
}

export const Inspector: React.FunctionComponent<InspectorProps> = ({
    engine
}) => {
    const [gameState, setGameState] = useState<GameState>();
    const [selectedId, setSelectedId] = useState<string>();
    const [selected, setSelected] = useState<[GameObject, Component<any>[]]>();

    useEffect(() => {
        const gameStateSubscription = engine
            .onChange()
            .pipe(throttleTime(1500))
            .subscribe((state: GameState) => {
                setGameState(state);
            });
        return () => gameStateSubscription.unsubscribe();
    });

    useEffect(() => {
        if (!!selectedId) {
            setSelected(engine.getGameObjectAndComponents(selectedId));
        }
    }, [gameState, selectedId]);

    return gameState ? (
        <div className="inspector">
            <div className="inspector__game-objects">
                <span>Inspector</span>

                <ul className="game-objects-list">
                    {Object.values(gameState.gameObjects).map(
                        (gameObject, index) => (
                            <li className="game-objects-list__item" key={index}>
                                <button
                                    className={
                                        gameObject.id === selectedId
                                            ? 'selected'
                                            : ''
                                    }
                                    onClick={() => setSelectedId(gameObject.id)}
                                >
                                    {gameObject.name}
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </div>

            <div className="inspector__selected">
                <span>{selectedId}</span>
                <pre>{JSON.stringify(selected, null, 4)}</pre>
            </div>
        </div>
    ) : (
        <span>loading...</span>
    );
};
