import { Engine, EngineTypes } from '../core/engine';
import { Sprite, SPRITE_COMPONENT } from './render/sprite';
import {
    MovementControls,
    MOVEMENT_CONTROLS_COMPONENT,
} from './input/movement_controls';
import { Collision, COLLISION_COMPONENT } from './collision/collision';
export { POSITION_COMPONENT } from '../core/component/position';

export type componentCollection = EngineTypes & {
    [SPRITE_COMPONENT]: Sprite;
    [MOVEMENT_CONTROLS_COMPONENT]: MovementControls;
    [COLLISION_COMPONENT]: Collision;
};

export type GameEngine = Engine<componentCollection>;
