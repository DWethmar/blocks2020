import { Engine, EngineSpec } from '../core/engine/engine';
import { Sprite } from './render/sprite';
import { MovementControls } from './movement-controls';

export const POSITION_COMPONENT = 'POSITION';
export const SPRITE_COMPONENT = 'SPRITE';
export const MOVEMENT_CONTROLS_COMPONENT = 'MOVEMENT_CONTROLS';

export type componentCollection = EngineSpec & {
    [SPRITE_COMPONENT]: Sprite;
    [MOVEMENT_CONTROLS_COMPONENT]: MovementControls;
};

export type GameEngine = Engine<componentCollection>;
