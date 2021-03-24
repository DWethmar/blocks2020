import * as React from 'react';
import ReactDOM from 'react-dom';

import { Game } from './game/game';
import {
    createFromPrefab,
    createPlayerPrefab,
    createWallPrefab,
    createTreePrefab,
    createGrassPrefab,
    createBoxPrefab,
} from './game/prefab';
import { Inspector } from './inspector/Inspector';
import { createPoint } from './core/component/position';

const viewContainer = document.getElementById('game-scene');

if (viewContainer) {
    const inspectorContainer = document.getElementById('game-inspector');

    const game = new Game(viewContainer);
    const gameObjectCreator = createFromPrefab(game.engine);

    gameObjectCreator(createPlayerPrefab(createPoint(20, 20)));
    gameObjectCreator(createWallPrefab(createPoint(50, 50)));
    gameObjectCreator(createTreePrefab(createPoint(100, 100)));
    gameObjectCreator(createGrassPrefab(createPoint(150, 150)));

    for (let i = 0; i < 10; i++) {
        gameObjectCreator(createBoxPrefab(createPoint(250, i * 40 + 10)));
    }

    ReactDOM.render(<Inspector engine={game.engine} />, inspectorContainer);
}
