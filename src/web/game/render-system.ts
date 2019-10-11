import * as PIXI from 'pixi.js'
import { Engine } from './engine';
import { withLatestFrom, take } from 'rxjs/operators';
import { ComponentType, Component } from './component';
import { System } from './system';
import { Sprite } from './sprite';

import data from '../assets/sprites-colored/spritesheet.json';
import image from '../assets/sprites-colored/spritesheet.png';
import { createPoint, addPoints } from './point-3d';

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
        engine.getComponentsByType(ComponentType.SPRITE).forEach((component: Component<Sprite>) => {

            let position = engine.getComponent(component.gameObjectId, ComponentType.POSITION);
            if (!position) {
                return;
            }

            let sprite = this.stage.getChildByName(component.id) as PIXI.Sprite;
            if (!sprite && this.spritesheet.textures.hasOwnProperty(component.state.name)) {
                sprite = new PIXI.Sprite(this.spritesheet.textures[component.state.name]);
                sprite.name = component.id;

                sprite.width = component.state.width;
                sprite.height = component.state.height;

                this.stage.addChild(sprite);
            }

            const spritePos = addPoints(position.state.position, component.state.offSet);

            sprite.position.x = spritePos.x;
            sprite.position.y = spritePos.y;
            sprite.zIndex = spritePos.y;

            engine.updateComponent(component);
        });
    }
}
