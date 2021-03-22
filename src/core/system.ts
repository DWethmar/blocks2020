import { Engine, EngineTypes } from './engine';

export interface System {
    onAttach(engine: Engine<EngineTypes>);

    update(engine: Engine<EngineTypes>, deltaTime: number);
}
