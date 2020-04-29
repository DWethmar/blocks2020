import * as React from 'react';
import ReactDOM from 'react-dom';

import { Game } from './game/game';
import {
    createFromPrefab,
    createPlayerPrefab,
    createWallPrefab,
    createTreePrefab,
    createGrassPrefab
} from './game/prefab';
import { Inspector } from './inspector/Inspector';
import { createPoint } from './game/position';

const viewContainer = document.getElementById('game-view');

if (viewContainer) {
    const inspectorContainer = document.getElementById('game-inspector');

    const game = new Game(viewContainer);
    const gameObjectCreator = createFromPrefab(game.engine);

    gameObjectCreator(createPlayerPrefab(createPoint(20, 20)));
    gameObjectCreator(createWallPrefab(createPoint(50, 50)));
    gameObjectCreator(createTreePrefab(createPoint(100, 100)));
    gameObjectCreator(createGrassPrefab(createPoint(150, 150)));

    ReactDOM.render(<Inspector engine={game.engine} />, inspectorContainer);
}
