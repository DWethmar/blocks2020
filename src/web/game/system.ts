import { Engine } from './engine/engine';

export interface System {
    onAttach(engine: Engine);

    update(engine: Engine, deltaTime: number);
}
