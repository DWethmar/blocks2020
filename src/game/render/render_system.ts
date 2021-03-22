import * as PIXI from 'pixi.js';
import { addPoints } from '../../core/point-3d';
import { System } from '../../core/system';
import { GameEngine, POSITION_COMPONENT, SPRITE_COMPONENT } from '../spec';

const data = require('../../assets/sprites-colored/spritesheet.json');
const image = require('../../assets/sprites-colored/spritesheet.png');

type Renderings = {
    [id: string]: PIXI.DisplayObject;
};

const addRendering = (renderings: Renderings) => (
    id: string,
    r: PIXI.DisplayObject
) => (renderings[id] = r);
const getRendering = (renderings: Renderings) => (id: string) => renderings[id];
const deleteRendering = (renderings: Renderings) => (id: string) =>
    delete renderings[id];

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

            let sprite = getRendering(this.renderings)(c.id);

            // create sprite if not exists.
            if (
                !sprite &&
                this.spritesheet.textures.hasOwnProperty(c.data.name)
            ) {
                const newSprite = new PIXI.Sprite(
                    this.spritesheet.textures[c.data.name]
                );

                newSprite.name = c.id;

                newSprite.width = c.data.width;
                newSprite.height = c.data.height;

                this.stage.addChild(newSprite);
                sprite = newSprite;

                addRendering(this.renderings)(c.id, sprite);
            }

            const spritePos = addPoints(position.data.position, c.data.offSet);

            sprite.position.x = spritePos.x;
            sprite.position.y = spritePos.y;
            sprite.zIndex = spritePos.y;

            engine.updateComponent(c.id, c.data);
        }
    }
}
