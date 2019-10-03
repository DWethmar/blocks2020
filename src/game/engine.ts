import { BehaviorSubject, Observable, iif, of, Subject } from 'rxjs';
import { take, map, tap, mergeMap, scan } from 'rxjs/operators';

import { GameState, initState } from './game-state';
import { GameObject } from './game-object';
import { System } from './system';
import { Component, ComponentType } from './component';

export interface Tick {
    delta: number,
}

export class Engine {

    private state: BehaviorSubject<GameState>;
    private tick: Subject<Tick>;
    private systems: System[];

    constructor() {
        this.state = new BehaviorSubject<GameState>(initState);
        this.tick = new Subject();
        this.systems = [];
    }

    public getTick() {
        return this.tick;
    }

    public getState() {
        return this.state.pipe(
            map(state => Object.assign({}, state))
        );
    }
 
    public addSystem(system: System) {
        this.systems.push(system);
        system.onAttach(this);
    }

    public update(delta: number) {
        this.tick.next({
            delta: delta,
        });
    }

    public addGameObject(gameObject: GameObject) {
        this.state.pipe(
            take(1),
        ).subscribe(state => {
            state.gameObjects[gameObject.id] = gameObject;
            this.state.next(state)
        });
    }

    public addComponent(component: Component<any>) {
        this.state.pipe(
            take(1),
        ).subscribe(state => {
            state.components[component.id] = component;

            // Cache component types
            if (!state.componentIdsByType.hasOwnProperty(component.type)) {
                state.componentIdsByType[component.type] = [];
            }
            state.componentIdsByType[component.type].push(component.id);

            // Cache component -> game object
            if (!state.componentIdByGameObject.hasOwnProperty(component.gameObjectId)) {
                state.componentIdByGameObject[component.gameObjectId] = {}
            }
            state.componentIdByGameObject[component.gameObjectId][component.type] = component.id

            this.state.next(state)
        });
    }

    public updateComponent<T>(component: Component<T>) {
        this.state.pipe(
            take(1),
        ).subscribe(state => {
            state.components[component.id] = component;
            this.state.next(state)
        });
    }

    public getComponent(gameObjectId: string, type: ComponentType): Observable<Component<any>> {
        return this.state.pipe(
            map(
                state => {
                    if (state.componentIdByGameObject.hasOwnProperty(gameObjectId)
                        && state.componentIdByGameObject[gameObjectId].hasOwnProperty(type)
                    ) {
                        const componentId = state.componentIdByGameObject[gameObjectId][type];
                        return state.components[componentId];
                    }
                    return null;
                }
            ),
        );
    }

    public getComponentsByType(type: ComponentType): Observable<Component<any>[]> {
        return this.state.pipe(
            map(
                state => {
                    if (state.componentIdsByType.hasOwnProperty(type)) {
                        return state.componentIdsByType[type].map(id => Object.assign({}, state.components[id]));
                    }
                    return [];
                }
            ),
        );
    }
}
