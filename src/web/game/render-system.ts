import * as PIXI from 'pixi.js'
import { Engine } from './engine';
import { withLatestFrom, take } from 'rxjs/operators';
import { ComponentType } from './component';
import { System } from './system';

import data from '../assets/sprites-colored/spritesheet.json';
import image from '../assets/sprites-colored/spritesheet.png';

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
        engine.frames.pipe(
            withLatestFrom(engine.getComponentsByType(ComponentType.SPRITE))
        ).subscribe(([tick, components]) => {
            components.forEach(component => {
                engine.getComponent(component.gameObjectId, ComponentType.POSITION)
                    .pipe(take(1))
                    .subscribe(position => {
                        let sprite = this.stage.getChildByName(component.id) as PIXI.Sprite;
                        if (!sprite && this.spritesheet.textures.hasOwnProperty(component.state.name)) {
                            sprite = new PIXI.Sprite(this.spritesheet.textures[component.state.name]);
                            sprite.name = component.id;

                            sprite.width = component.state.width;
                            sprite.height = component.state.height;

                            this.stage.addChild(sprite);
                        }
                        sprite.position.x = position.state.position.x;
                        sprite.position.y = position.state.position.y;
                    });
            });
        });
    }
}
