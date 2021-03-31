import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { State, newState } from './state';
import {
    GameObject,
    addGameObject,
    getGameObject,
} from './gameobject/gameobject';
import { System } from './system';
import {
    Component,
    addComponent,
    updateComponent,
} from './component/component';
import { Position, POSITION_COMPONENT } from './component/position';

export type EngineTypes = {
    [name: string]: Component;
    [POSITION_COMPONENT]: Position;
};

export class Engine<T extends EngineTypes> {
    private state: State;
    private systems: System[];
    private change: Subject<State>;
    private deltaTime: number;

    constructor() {
        this.state = newState();
        this.systems = [];
        this.change = new BehaviorSubject<State>(this.state);
        this.deltaTime = 0;
    }

    public getDeltaTime(): number {
        return this.deltaTime;
    }

    public update(deltaTime: number) {
        this.deltaTime = deltaTime;
        this.systems.forEach((system) => system.beforeUpdate(this));
        this.systems.forEach((system) => system.update(this));
        this.systems.forEach((system) => system.afterUpdate(this));
    }

    public getState() {
        return this.state;
    }

    public onChange(): Observable<State> {
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
        addGameObject(this.state.gameObjects)(gameObject);
        this.setChanged();
    }

    public addComponent(component: Component) {
        if (this.getComponent(component.gameObjectID, component.type) != null) {
            throw new Error(
                `Gameobject with id: ${component.gameObjectID} already has a component of type: ${component.type}`
            );
        }

        addComponent(this.state.components)(component);

        // Cache component types
        if (!this.state.componentIdsByType.hasOwnProperty(component.type)) {
            this.state.componentIdsByType[component.type] = [];
        }

        this.state.componentIdsByType[component.type].push(component.ID);

        // Cache component -> game object
        if (
            !this.state.componentIdByGameObject.hasOwnProperty(
                component.gameObjectID
            )
        ) {
            this.state.componentIdByGameObject[component.gameObjectID] = {};
        }
        this.state.componentIdByGameObject[component.gameObjectID][
            component.type
        ] = component.ID;

        this.setChanged();
    }

    public updateComponent(component: Component) {
        const current = this.getComponent(
            component.gameObjectID,
            component.type
        );
        if (current != null && current.type != component.type) {
            throw new Error(
                `Gameobject with id: ${component.gameObjectID} has a component of type: ${component.type}`
            );
        }

        updateComponent(this.state.components)(component);
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
        const gameObject = getGameObject(this.state.gameObjects)(gameObjectId);
        if (!gameObject) {
            throw `Could not find gameobject with id ${gameObjectId}`;
        }

        if (this.state.componentIdByGameObject.hasOwnProperty(gameObjectId)) {
            components.push(
                ...Object.values(
                    this.state.componentIdByGameObject[gameObjectId]
                ).map((id: string) => this.state.components[id])
            );
        }

        return [gameObject, components];
    }

    public getComponentsByType<K extends keyof T>(type: K): T[K][] {
        type componentType = T[K];

        if (this.state.componentIdsByType.hasOwnProperty(type)) {
            return this.state.componentIdsByType[type as string].map(
                (id: string) =>
                    Object.assign(
                        {},
                        this.state.components[id]
                    ) as componentType
            );
        }
        return [];
    }
}
