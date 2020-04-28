import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { GameState, initState } from './game-state';
import { GameObject } from './game-object';
import { System } from '../system';
import { Component, ComponentType } from './component';

export class Engine {
    private state: GameState;
    private systems: System[];
    private change: Subject<GameState>;

    constructor() {
        this.state = initState;
        this.systems = [];

        this.change = new BehaviorSubject<GameState>(this.state);
    }

    public update(deltaTime: number) {
        this.systems.forEach(system => system.update(this, deltaTime));
    }

    public getState() {
        return this.state;
    }

    public onChange(): Observable<GameState> {
        return this.change;
    }

    public setChanged() {
        this.change.next(this.state);
    }

    public addSystem(system: System) {
        this.systems.push(system);
        system.onAttach(this);
    }

    public addGameObject(gameObject: GameObject) {
        this.state.gameObjects[gameObject.id] = gameObject;
        this.setChanged();
    }

    public addComponent(component: Component<any>) {
        this.state.components[component.id] = component;

        // Cache component types
        if (!this.state.componentIdsByType.hasOwnProperty(component.type)) {
            this.state.componentIdsByType[component.type] = [];
        }

        this.state.componentIdsByType[component.type].push(component.id);

        // Cache component -> game object
        if (
            !this.state.componentIdByGameObject.hasOwnProperty(
                component.gameObjectId
            )
        ) {
            this.state.componentIdByGameObject[component.gameObjectId] = {};
        }
        this.state.componentIdByGameObject[component.gameObjectId][
            component.type
        ] = component.id;

        this.setChanged();
    }

    public updateComponent<T>(component: Component<T>) {
        this.state.components[component.id] = component;
        this.setChanged();
    }

    public getComponent(
        gameObjectId: string,
        type: ComponentType
    ): Component<any> {
        if (
            this.state.componentIdByGameObject.hasOwnProperty(gameObjectId) &&
            this.state.componentIdByGameObject[gameObjectId].hasOwnProperty(
                type
            )
        ) {
            const componentId = this.state.componentIdByGameObject[
                gameObjectId
            ][type];
            return Object.assign({}, this.state.components[componentId]);
        }
        return null;
    }

    public getGameObjectAndComponents(
        gameObjectId: string
    ): [GameObject, Component<any>[]] {
        const components = [];
        if (this.state.componentIdByGameObject.hasOwnProperty(gameObjectId)) {
            components.push(
                ...Object.values(
                    this.state.componentIdByGameObject[gameObjectId]
                ).map(id => this.state.components[id])
            );
        }
        return [this.state.gameObjects[gameObjectId], components];
    }

    public getComponentsByType(type: ComponentType): Component<any>[] {
        if (this.state.componentIdsByType.hasOwnProperty(type)) {
            return this.state.componentIdsByType[type].map(id =>
                Object.assign({}, this.state.components[id])
            );
        }
        return [];
    }
}
