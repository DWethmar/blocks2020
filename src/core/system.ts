import { Engine, EngineTypes } from './engine';

export interface System {
    onAttach(engine: Engine<EngineTypes>): void;

    beforeUpdate(engine: Engine<EngineTypes>): void;

    update(engine: Engine<EngineTypes>): void;

    afterUpdate(engine: Engine<EngineTypes>): void;
}
