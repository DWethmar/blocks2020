import * as PIXI from 'pixi.js';
import { System } from '../../core/system';
import { Events } from '../../core/events';
import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { Renderings, addRendering, getRendering } from '../render/renderings';
import { addPoints2D, addPoints3D } from '../../core/point';
import { COLLISION_COMPONENT } from '../collision/collider';
import { DEBUG_COMPONENT } from './debug';
import { SPRITE_COMPONENT } from '../render/sprite';

export class TestSystem implements System {
    private events: Events;
    private debugRenderings: Renderings;
    private stage: PIXI.Container;

    constructor(events: Events, stage: PIXI.Container) {
        console.log('Created TestSystem');
        this.events = events;
        this.debugRenderings = {};
        this.stage = stage;
    }

    onAttach(engine: GameEngine) { }

    beforeUpdate(engine: GameEngine): void { }

    afterUpdate(engine: GameEngine): void { }

    update(engine: GameEngine) {
        for (const d of engine.getComponentsByType(DEBUG_COMPONENT)) {
            // Debug position
            const pos = engine.getComponent(d.gameObjectID, POSITION_COMPONENT);
            const col = engine.getComponent(d.gameObjectID, COLLISION_COMPONENT);
            const sprite = engine.getComponent(d.gameObjectID, SPRITE_COMPONENT);

            if (sprite && pos) {
                // Debug physics debug
                let pid = `${d.ID}_sprite`;
                let spriteGraphics = getRendering(this.debugRenderings)(
                    pid
                ) as PIXI.Graphics;

                if (!spriteGraphics) {
                    spriteGraphics = new PIXI.Graphics();
                    spriteGraphics.lineStyle(1, 0x00FF00);
                    spriteGraphics.drawRect(
                        0,
                        0,
                        sprite.data.width,
                        sprite.data.height,
                    );
                    this.stage.addChild(spriteGraphics);
                    addRendering(this.debugRenderings)(
                        pid,
                        spriteGraphics
                    );
                }

                const spritePos = addPoints2D(pos.data.position, sprite.data.offSet);
                spriteGraphics.position.x = spritePos.x;
                spriteGraphics.position.y = spritePos.y;
            }

            if (pos) {
                let gid = `${d.ID}_position`;
                let dotGraphics = getRendering(this.debugRenderings)(
                    gid
                ) as PIXI.Graphics;

                if (!dotGraphics) {
                    dotGraphics = new PIXI.Graphics();
                    dotGraphics.beginFill(0xffffff);
                    dotGraphics.drawCircle(0, 0, 2);
                    dotGraphics.endFill();
                    this.stage.addChild(dotGraphics);
                    addRendering(this.debugRenderings)(gid, dotGraphics);
                }

                dotGraphics.transform.position.x = pos.data.position.x;
                dotGraphics.transform.position.y = pos.data.position.y;

                let tid = `${d.ID}_text`;
                let textGraphic = getRendering(this.debugRenderings)(
                    tid
                ) as PIXI.Text;
                let debugText = [
                    `x:${Math.floor(pos.data.position.x)}|${pos.data.velocity.x}`,
                    `y:${Math.floor(pos.data.position.y)}|${pos.data.velocity.y}`,
                ].join('\n');

                if (!textGraphic) {
                    textGraphic = new PIXI.Text(debugText, {
                        fontFamily: 'monospace',
                        fontSize: 14,
                        fill: 0xff1010,
                        align: 'left',
                    });
                    this.stage.addChild(textGraphic);
                    addRendering(this.debugRenderings)(tid, textGraphic);
                }

                textGraphic.transform.position.x = pos.data.position.x;
                textGraphic.transform.position.y = pos.data.position.y;
                textGraphic.text = debugText;
            }

            if (col && pos) {
                // Debug physics debug
                let pid = `${d.ID}_physics`;
                let physicsGraphics = getRendering(this.debugRenderings)(
                    pid
                ) as PIXI.Graphics;

                if (!physicsGraphics) {
                    physicsGraphics = new PIXI.Graphics();
                    // set the line style to have a width of 5 and set the color to red
                    physicsGraphics.lineStyle(1, 0xff0000);

                    if (col.data.shape.kind == 'square') {
                        // draw a rectangle
                        physicsGraphics.drawRect(
                            0,
                            0,
                            col.data.shape.width,
                            col.data.shape.height
                        );
                    }

                    if (col.data.shape.kind == 'circle') {
                        // draw a circle
                        physicsGraphics.drawCircle(
                            0,
                            0,
                            col.data.shape.radius
                        );
                    }

                    this.stage.addChild(physicsGraphics);
                    addRendering(this.debugRenderings)(
                        pid,
                        physicsGraphics
                    );
                }

                const physicsGraphicsPos = addPoints2D(pos.data.position, col.data.offSet);

                physicsGraphics.position.x = physicsGraphicsPos.x;
                physicsGraphics.position.y = physicsGraphicsPos.y;
            }
        }
    }
}
