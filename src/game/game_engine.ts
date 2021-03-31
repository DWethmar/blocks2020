import { Engine, EngineTypes } from '../core/engine';
import { Sprite, SPRITE_COMPONENT } from './render/sprite';
import {
    MovementControls,
    MOVEMENT_CONTROLS_COMPONENT,
} from './input/movement_controls';
import { Collider, COLLISION_COMPONENT } from './collision/collider';
import { Follow, FOLLOW_COMPONENT } from './behavior/follow';
import { Debug, DEBUG_COMPONENT } from './debug/debug';
import { Shooter, SHOOTER_COMPONENT } from './shoot/shoot';
import { Direction, DIRECTION_COMPONENT } from './direction/direction';
export { POSITION_COMPONENT } from '../core/component/position';

export type componentCollection = EngineTypes & {
    [DIRECTION_COMPONENT]: Direction;
    [SPRITE_COMPONENT]: Sprite;
    [MOVEMENT_CONTROLS_COMPONENT]: MovementControls;
    [COLLISION_COMPONENT]: Collider;
    [FOLLOW_COMPONENT]: Follow;
    [DEBUG_COMPONENT]: Debug;
    [SHOOTER_COMPONENT]: Shooter;
};

export type GameEngine = Engine<componentCollection>;
