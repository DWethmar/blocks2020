import { Game } from './game';
import { createGameObject } from './game-object';
import { createPositionComponent, createPoint } from './point-3d';
import { createSpriteComponent } from './sprite';
import { throttleTime } from 'rxjs/operators';
import { createMovementControlsComponent } from './movement-controls';

const game = new Game(document.body);

const gameObject = createGameObject('player1');
game.engine.addGameObject(gameObject);
game.engine.addComponent(
    createPositionComponent(gameObject.id, createPoint(20, 20))
);
game.engine.addComponent(
    createMovementControlsComponent(gameObject.id)
);
game.engine.addComponent(
    createSpriteComponent({
        gameObjectId: gameObject.id,
        spriteName: 'colored_transparent-30.png', 
        width: 16,
        height: 16,
        offSet: createPoint(-8, -16, 0)
    })
);

const tree = createGameObject('tree');
game.engine.addGameObject(tree);
game.engine.addComponent(
    createPositionComponent(tree.id, createPoint(50, 50))
);
game.engine.addComponent(
    createSpriteComponent({
        gameObjectId: tree.id,
        spriteName: 'colored_transparent-31.png',
        width: 16,
        height: 16,
        offSet: createPoint(-8, -16, 0)
    })
);

// DEBUG
const list: HTMLUListElement = document.createElement("ul"); 
list.classList.add('game-objects');
list.style.cssFloat = 'right';

game.engine.onChange()
    .pipe(
        throttleTime(50),
        // distinctUntilChanged(),
    )
    .subscribe(state => {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        Object.values(state.gameObjects).forEach(gameObject => {
            const li = document.createElement('li');
            li.innerHTML = `<span title="${gameObject.id}">${gameObject.name}</span>`;
            
            const componentList: HTMLUListElement = document.createElement("ul"); 
            componentList.classList.add('components');
            if (state.componentIdByGameObject.hasOwnProperty(gameObject.id)) {
                for (let [type, componentId] of Object.entries(state.componentIdByGameObject[gameObject.id])) {
                    const component = state.components[componentId];
                    if (component) {
                        const subLi = document.createElement('li');
                        subLi.innerHTML = `<span title="${component.id}">${component.type}</span><pre>${JSON.stringify(component.state, null, ' ')}</pre>`;
                        componentList.appendChild(subLi);
                    }
                }
            }
            li.appendChild(componentList);
            list.appendChild(li);
        });
});

document.body.appendChild(list);
