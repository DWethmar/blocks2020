import { Game } from './game';
import { createGameObject } from './game-object';
import { createPositionComponent } from './point-3d';
import { createSpriteComponent } from './sprite';
import { distinctUntilChanged } from 'rxjs/operators';

const game = new Game(document.body);

const gameObject = createGameObject('player1');
game.engine.addGameObject(gameObject);
game.engine.addComponent(
    createPositionComponent(gameObject.id, null)
);
game.engine.addComponent(
    createSpriteComponent(gameObject.id, 'colored_transparent-30.png')
);

// // DEBUG
// const list: HTMLUListElement = document.createElement("ul"); 
// list.classList.add('game-objects');
// list.style.cssFloat = 'right';

// game.engine.getState()
//     .pipe(distinctUntilChanged())
//     .subscribe(state => {
//         while (list.firstChild) {
//             list.removeChild(list.firstChild);
//         }
//         Object.values(state.gameObjects).forEach(gameObject => {
//             const li = document.createElement('li');
//             li.innerHTML = `<b>${gameObject.id}</b> ${gameObject.name}`;
            
//             const componentList: HTMLUListElement = document.createElement("ul"); 
//             componentList.classList.add('components');
//             if (state.componentIdByGameObject.hasOwnProperty(gameObject.id)) {
//                 for (let [type, componentId] of Object.entries(state.componentIdByGameObject[gameObject.id])) {
//                     const component = state.components[componentId];
//                     if (component) {
//                         const subLi = document.createElement('li');
//                         subLi.innerHTML = `<b>${component.id}</b> ${component.type} <br /> ${JSON.stringify(component.state, null, '\t')}`;
//                         componentList.appendChild(subLi);
//                     }
//                 }
//             }
//             li.appendChild(componentList);
//             list.appendChild(li);
//         });
// });

// document.body.appendChild(list);
