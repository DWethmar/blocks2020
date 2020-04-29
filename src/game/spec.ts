import { Engine } from '../core/engine/engine';
import { Position } from './position';

import { Sprite } from './render/sprite';
import { MovementControls } from './movement-controls';

export const POSITION_COMPONENT = 'POSITION';
export const SPRITE_COMPONENT = 'SPRITE';
export const MOVEMENT_CONTROLS_COMPONENT = 'MOVEMENT_CONTROLS';

export type componentCollection = {
    [POSITION_COMPONENT]: Position;
    [SPRITE_COMPONENT]: Sprite;
    [MOVEMENT_CONTROLS_COMPONENT]: MovementControls;
};

export type GameEngine = Engine<componentCollection>;
