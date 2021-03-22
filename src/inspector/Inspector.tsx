import * as React from 'react';
import { throttleTime } from 'rxjs/operators';

import { useEffect, useState } from 'react';
import { GameEngine } from '../game/spec';
import { State } from '../core/engine/state';
import { GameObject } from '../core/gameobject/gameobject';
import { Component } from '../core/component/component';

export interface InspectorProps {
    engine: GameEngine;
}

export const Inspector: React.FunctionComponent<InspectorProps> = ({
    engine,
}) => {
    const [gameState, setGameState] = useState<State>();
    const [selectedId, setSelectedId] = useState<string>();
    const [selected, setSelected] = useState<[GameObject, Component[]]>();

    useEffect(() => {
        const gameStateSubscription = engine
            .onChange()
            .pipe(throttleTime(1500))
            .subscribe((state: State) => {
                setGameState(state);
            });
        return () => gameStateSubscription.unsubscribe();
    });

    useEffect(() => {
        if (!!selectedId) {
            setSelected(engine.getGameObjectAndComponents(selectedId));
        }
    }, [selectedId, gameState]);

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
