import { Engine, EngineTypes } from '../core/engine';
import { Sprite, SPRITE_COMPONENT } from './render/sprite';
import {
    MovementControls,
    MOVEMENT_CONTROLS_COMPONENT,
} from './input/movement_controls';
import { Collider, COLLISION_COMPONENT } from './collision/collider';
import { Follow, FOLLOW_COMPONENT } from './behavior/follow';
import { Debug, DEBUG_COMPONENT } from './debug/debug';
export { POSITION_COMPONENT } from '../core/component/position';

export type componentCollection = EngineTypes & {
    [SPRITE_COMPONENT]: Sprite;
    [MOVEMENT_CONTROLS_COMPONENT]: MovementControls;
    [COLLISION_COMPONENT]: Collider;
    [FOLLOW_COMPONENT]: Follow;
    [DEBUG_COMPONENT]: Debug;
};

export type GameEngine = Engine<componentCollection>;
