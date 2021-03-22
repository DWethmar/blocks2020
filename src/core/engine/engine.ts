import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { State, initState } from './state';
import {
    GameObject,
    addGameObject,
    getGameObject,
} from '../gameobject/gameobject';
import { System } from './system';
import {
    Component,
    addComponent,
    ComponentData,
    updateComponent,
} from '../component/component';
import { POSITION_COMPONENT } from '../../game/spec';
import { Position } from '../component/position';

export type EngineSpec = {
    [name: string]: Component;
    [POSITION_COMPONENT]: Position;
};

export class Engine<T extends EngineSpec> {
    private state: State;
    private systems: System[];
    private change: Subject<State>;

    constructor() {
        this.state = initState;
        this.systems = [];

        this.change = new BehaviorSubject<State>(this.state);
    }

    public update(deltaTime: number) {
        this.systems.forEach((system) => system.update(this, deltaTime));
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
        addComponent(this.state.components)(component);

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

    public updateComponent(id: string, data: ComponentData) {
        updateComponent(this.state.components)(id, data);
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
