import * as React from 'react';
import ReactDOM from 'react-dom';

import { Game } from './game/game';
import { createPoint } from './game/point-3d';
import {
    createFromPrefab,
    createPlayerPrefab,
    createWallPrefab,
    createTreePrefab,
    createGrassPrefab
} from './game/prefab';
import { Inspector } from './inspector/Inspector';

const viewContainer = document.getElementById('game-view');
const inspectorContainer = document.getElementById('game-inspector');

const game = new Game(viewContainer);
const gameObjectCreator = createFromPrefab(game.engine);

gameObjectCreator(createPlayerPrefab(createPoint(20, 20)));
gameObjectCreator(createWallPrefab(createPoint(50, 50)));
gameObjectCreator(createTreePrefab(createPoint(100, 100)));
gameObjectCreator(createGrassPrefab(createPoint(150, 150)));

ReactDOM.render(<Inspector engine={game.engine} />, inspectorContainer);
