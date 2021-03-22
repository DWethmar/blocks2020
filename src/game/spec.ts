import { Engine, EngineSpec } from '../core/engine';
import { Sprite } from './render/sprite';
import { MovementControls } from './movement_controls';
export { POSITION_COMPONENT } from '../core/component/position';
export const SPRITE_COMPONENT = 'SPRITE';
export const MOVEMENT_CONTROLS_COMPONENT = 'MOVEMENT_CONTROLS';

export type componentCollection = EngineSpec & {
    [SPRITE_COMPONENT]: Sprite;
    [MOVEMENT_CONTROLS_COMPONENT]: MovementControls;
};

export type GameEngine = Engine<componentCollection>;
