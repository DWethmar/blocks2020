import { Game } from './game';
import { createPoint } from './point-3d';
import { throttleTime } from 'rxjs/operators';
import { createFromPrefab, createPlayerPrefab, createWallPrefab, createTreePrefab } from './prefab';

const game = new Game(document.body);

const gameObjectCreator = createFromPrefab(game.engine);

gameObjectCreator(createPlayerPrefab(createPoint(20, 20)));
gameObjectCreator(createWallPrefab(createPoint(50, 50)));
gameObjectCreator(createTreePrefab(createPoint(100, 100)));

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
