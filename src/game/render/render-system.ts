import * as PIXI from 'pixi.js';
import { Engine } from '../engine/engine';
import { ComponentType } from '../engine/component';
import { System } from '../system';
import { addPoints } from '../point-3d';

const data = require('../../assets/sprites-colored/spritesheet.json');
const image = require('../../assets/sprites-colored/spritesheet.png');

export class RenderSystem implements System {
    private stage: PIXI.Container;
    public spritesheet: PIXI.Spritesheet;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
    }

    async onAttach(engine: Engine) {
        // Load assets
        await new Promise<boolean>((resolve): void => {
            const baseTexture = new PIXI.BaseTexture(image);
            this.spritesheet = new PIXI.Spritesheet(baseTexture, data);
            this.spritesheet.parse(() => {
                resolve();
            });
        });
    }

    update(engine: Engine, deltaTime: number) {
        for (const c of engine.getComponentsByType(ComponentType.SPRITE)) {
            let position = engine.getComponent(
                c.gameObjectId,
                ComponentType.POSITION
            );

            if (!position) {
                return;
            }

            let sprite = this.stage.getChildByName(c.id) as PIXI.Sprite;

            if (
                !sprite &&
                this.spritesheet.textures.hasOwnProperty(c.state.name)
            ) {
                sprite = new PIXI.Sprite(
                    this.spritesheet.textures[c.state.name]
                );
                sprite.name = c.id;

                sprite.width = c.state.width;
                sprite.height = c.state.height;

                this.stage.addChild(sprite);
            }

            const spritePos = addPoints(
                position.state.position,
                c.state.offSet
            );

            sprite.position.x = spritePos.x;
            sprite.position.y = spritePos.y;
            sprite.zIndex = spritePos.y;

            engine.updateComponent(c);
        }
    }
}
