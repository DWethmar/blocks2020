import { Engine, EngineTypes } from './engine';

export interface System {
    onAttach(engine: Engine<EngineTypes>): void;

    update(engine: Engine<EngineTypes>, deltaTime: number): void;
}
