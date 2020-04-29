import * as PIXI from 'pixi.js';
import { addPoints } from '../../core/point-3d';
import { System } from '../../core/engine/system';
import { GameEngine, SPRITE_COMPONENT, POSITION_COMPONENT } from '../spec';

const data = require('../../assets/sprites-colored/spritesheet.json');
const image = require('../../assets/sprites-colored/spritesheet.png');

export class RenderSystem implements System {
    private stage: PIXI.Container;
    private spritesheet: PIXI.Spritesheet | null;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.spritesheet = null;
    }

    async onAttach(engine: GameEngine) {
        // Load assets
        await new Promise<boolean>((resolve): void => {
            const baseTexture = new PIXI.BaseTexture(image);
            this.spritesheet = new PIXI.Spritesheet(baseTexture, data);
            this.spritesheet.parse(() => {
                resolve();
            });
        });
    }

    update(engine: GameEngine, deltaTime: number) {
        if (!this.spritesheet) {
            return;
        }
        for (const c of engine.getComponentsByType(SPRITE_COMPONENT)) {
            const position = engine.getComponent(
                c.gameObjectId,
                POSITION_COMPONENT
            );

            if (!position) {
                return;
            }

            let sprite = this.stage.getChildByName(c.id) as PIXI.Sprite;

            if (
                !sprite &&
                this.spritesheet.textures.hasOwnProperty(c.data.name)
            ) {
                sprite = new PIXI.Sprite(
                    this.spritesheet.textures[c.data.name]
                );

                sprite.name = c.id;

                sprite.width = c.data.width;
                sprite.height = c.data.height;

                this.stage.addChild(sprite);
            }

            const spritePos = addPoints(position.data.position, c.data.offSet);

            sprite.position.x = spritePos.x;
            sprite.position.y = spritePos.y;
            sprite.zIndex = spritePos.y;

            engine.updateComponent(c);
        }
    }
}
