import { Engine, EngineSpec } from './engine';

export interface System {
    onAttach(engine: Engine<EngineSpec>);

    update(engine: Engine<EngineSpec>, deltaTime: number);
}
