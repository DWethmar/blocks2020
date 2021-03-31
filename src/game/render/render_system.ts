import * as PIXI from 'pixi.js';
import { addPoints } from '../../core/point';
import { System } from '../../core/system';
import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { SPRITE_COMPONENT } from './sprite';
import { Renderings, addRendering, getRendering } from './renderings';

const data = require('../../assets/sprites-colored/spritesheet.json');
const image = require('../../assets/sprites-colored/spritesheet.png');

export class RenderSystem implements System {
    private stage: PIXI.Container;
    private spritesheet: PIXI.Spritesheet | null;
    private renderings: Renderings;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.spritesheet = null;
        this.renderings = {};
    }

    async onAttach(engine: GameEngine) {
        // Load assets
        await new Promise<boolean>((resolve): void => {
            const baseTexture = new PIXI.BaseTexture(image);
            this.spritesheet = new PIXI.Spritesheet(baseTexture, data);
            this.spritesheet.parse(() => {
                resolve(true);
            });
        });
    }

    beforeUpdate(engine: GameEngine): void {}

    afterUpdate(engine: GameEngine): void {}

    update(engine: GameEngine) {
        if (!this.spritesheet) {
            return;
        }

        for (const c of engine.getComponentsByType(SPRITE_COMPONENT)) {
            const position = engine.getComponent(
                c.gameObjectID,
                POSITION_COMPONENT
            );
            if (!position) continue;

            let sprite = getRendering(this.renderings)(c.ID);

            // create sprite if not exists.
            if (
                !sprite &&
                this.spritesheet.textures.hasOwnProperty(c.data.name)
            ) {
                const newSprite = new PIXI.Sprite(
                    this.spritesheet.textures[c.data.name]
                );

                newSprite.name = c.ID;

                newSprite.width = c.data.width;
                newSprite.height = c.data.height;

                this.stage.addChild(newSprite);
                sprite = newSprite;

                addRendering(this.renderings)(c.ID, sprite);
            }

            const spritePos = addPoints(position.data.position, c.data.offSet);

            sprite.position.x = spritePos.x;
            sprite.position.y = spritePos.y;
            sprite.zIndex = spritePos.y;

            engine.updateComponent(c);
        }
    }
}
