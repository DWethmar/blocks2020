import * as React from 'react';
import { throttleTime } from 'rxjs/operators';

import { useEffect, useState, useMemo } from 'react';
import { GameEngine } from '../game/game_engine';
import { State } from '../core/state';
import { InspectComponent } from './component';

export interface InspectorProps {
    engine: GameEngine;
}

export const Inspector: React.FunctionComponent<InspectorProps> = ({
    engine,
}) => {
    const onChange = useMemo(() => engine.onChange(), []);
    const [gameState, setGameState] = useState<State>();
    const [selectedId, setSelectedId] = useState<string>();

    useEffect(() => {
        const gameStateSubscription = engine
            .onChange()
            .pipe(throttleTime(100))
            .subscribe((state: State) => {
                setGameState(Object.assign({}, state));
            });
        return () => gameStateSubscription.unsubscribe();
    }, [onChange]);

    let selected = null;
    if (!!selectedId) {
        selected = engine.getGameObjectAndComponents(selectedId);
    }

    return gameState ? (
        <div className="inspector">
            <div className="inspector__game-objects">
                <span>Inspector</span>
                <div>
                    components: {Object.keys(gameState.components).length}
                </div>
                <ul className="game-objects-list">
                    {Object.values(gameState.gameObjects).map(
                        (gameObject, index) => (
                            <li className="game-objects-list__item" key={index}>
                                <button
                                    className={
                                        gameObject.ID === selectedId
                                            ? 'selected'
                                            : ''
                                    }
                                    onClick={() => setSelectedId(gameObject.ID)}
                                >
                                    {gameObject.name}
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </div>

            <div className="inspector__selected">
                {!!selected ? (
                    <div>
                        <span>{selectedId}</span>
                        <pre>{JSON.stringify(selected[0], null, 4)}</pre>
                        <hr />
                        Components:
                        <ul className="component-list">
                            {selected[1].map((c, i) => (
                                <li key={i} className="component-list__item">
                                    <InspectComponent component={c} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <span>None selected</span>
                )}
            </div>
        </div>
    ) : (
        <span>loading...</span>
    );
};
