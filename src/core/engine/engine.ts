import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { GameState, initState } from './game-state';
import { GameObject } from './game-object';
import { System } from './system';
import { Component } from './component';

export type EngineSpec = Record<string, Component>;

export class Engine<T extends EngineSpec> {
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

    private setChanged() {
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

    public addComponent(component: Component) {
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

    public updateComponent(component: Component) {
        this.state.components[component.id] = component;
        this.setChanged();
    }

    public getComponent<K extends keyof T>(
        gameObjectId: string,
        type: K
    ): T[K] | null {
        if (
            this.state.componentIdByGameObject.hasOwnProperty(gameObjectId) &&
            this.state.componentIdByGameObject[gameObjectId].hasOwnProperty(
                type
            )
        ) {
            const componentId = this.state.componentIdByGameObject[
                gameObjectId
            ][type as string];

            return Object.assign(
                {},
                this.state.components[componentId]
            ) as T[K];
        }
        return null;
    }

    public getGameObjectAndComponents(
        gameObjectId: string
    ): [GameObject, Component[]] {
        const components = [];

        if (this.state.componentIdByGameObject.hasOwnProperty(gameObjectId)) {
            components.push(
                ...Object.values(
                    this.state.componentIdByGameObject[gameObjectId]
                ).map((id: string) => this.state.components[id])
            );
        }

        return [this.state.gameObjects[gameObjectId], components];
    }

    public getComponentsByType<K extends keyof T>(type: K): T[K][] {
        if (this.state.componentIdsByType.hasOwnProperty(type)) {
            return this.state.componentIdsByType[
                type as string
            ].map((id: string) => Object.assign({}, this.state.components[id]));
        }
        return [];
    }
}
