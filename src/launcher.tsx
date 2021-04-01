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
    createMobPrefab,
} from './game/prefab';
import { Inspector } from './inspector/Inspector';
import { createPoint3D } from './core/component/position';

const viewContainer = document.getElementById('game-scene');

if (viewContainer) {
    const inspectorContainer = document.getElementById('game-inspector');

    const game = new Game(viewContainer);
    const gameObjectCreator = createFromPrefab(game.engine);

    gameObjectCreator(createPlayerPrefab(createPoint3D(20, 20)));
    gameObjectCreator(createWallPrefab(createPoint3D(50, 150)));
    gameObjectCreator(createTreePrefab(createPoint3D(100, 100)));
    gameObjectCreator(createGrassPrefab(createPoint3D(150, 150)));

    for (let i = 0; i < 10; i++) {
        gameObjectCreator(createBoxPrefab(createPoint3D(250, i * 40 + 10)));
    }

    gameObjectCreator(createMobPrefab(createPoint3D(200, 100)));

    ReactDOM.render(<Inspector engine={game.engine} />, inspectorContainer);
}
