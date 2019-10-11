import { BehaviorSubject, Observable, iif, of, Subject } from 'rxjs';
import { take, map, tap, mergeMap, scan, share, expand, filter } from 'rxjs/operators';

import { GameState, initState } from './game-state';
import { GameObject } from './game-object';
import { System } from './system';
import { Component, ComponentType } from './component';

export interface Tick {
    frameStartTime: number;
    deltaTime: number,
}

export const clampTo30FPS = (frame: Tick) => {
    if (frame.deltaTime > (1 / 30)) {
        frame.deltaTime = 1 / 30;
    }
    return frame;
}

export class Engine {

    private state: BehaviorSubject<GameState>;
    private systems: System[];

    public readonly frames: Observable<number>;

    constructor() {
        this.state = new BehaviorSubject<GameState>(initState);
        this.systems = [];

        const calculateStep: (prevFrame: Tick) => Observable<Tick> = (prevFrame: Tick) => {
            return Observable.create((observer) => {
                requestAnimationFrame((frameStartTime) => {
                    const deltaTime = prevFrame ? (frameStartTime - prevFrame.frameStartTime) / 1000 : 0;
                    observer.next({
                        frameStartTime,
                        deltaTime
                    });
                })
            }).pipe(
                map(clampTo30FPS)
            )
        };

        this.frames = of(undefined)
            .pipe(
                expand((val) => calculateStep(val)),
                // Expand emits the first value provided to it, and in this
                //  case we just want to ignore the undefined input frame
                filter(frame => frame !== undefined),
                map((frame: Tick) => frame.deltaTime),
                share()
            )
    }

    public getState() {
        return this.state;
    }
 
    public addSystem(system: System) {
        this.systems.push(system);
        system.onAttach(this);
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
