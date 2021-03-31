import * as PIXI from 'pixi.js';
import { System } from '../../core/system';
import { Events } from '../../core/events';
import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { Renderings, addRendering, getRendering } from '../render/renderings';
import { addPoints } from '../../core/point';
import { COLLISION_COMPONENT } from '../collision/collider';
import { DEBUG_COMPONENT } from './debug';

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

    onAttach(engine: GameEngine) {}

    beforeUpdate(engine: GameEngine): void {}

    afterUpdate(engine: GameEngine): void {}

    update(engine: GameEngine) {
        for (const d of engine.getComponentsByType(DEBUG_COMPONENT)) {
            // Debug position
            const c = engine.getComponent(d.gameObjectID, POSITION_COMPONENT);
            const x = engine.getComponent(d.gameObjectID, COLLISION_COMPONENT);
            if (x && c) {
                let gid = `${d.ID}_graphics`;
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
                dotGraphics.transform.position.x = c.data.position.x;
                dotGraphics.transform.position.y = c.data.position.y;

                let tid = `${d.ID}_text`;
                let textGraphic = getRendering(this.debugRenderings)(
                    tid
                ) as PIXI.Text;
                let debugText = [
                    `x:${Math.floor(c.data.position.x)}|${c.data.velocity.x}`,
                    `y:${Math.floor(c.data.position.y)}|${c.data.velocity.y}`,
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
                textGraphic.transform.position.x = c.data.position.x;
                textGraphic.transform.position.y = c.data.position.y;
                textGraphic.text = debugText;

                // Debug physics debug
                let pid = `${d.ID}_physics`;
                const collision = engine.getComponent(
                    c.gameObjectID,
                    COLLISION_COMPONENT
                );
                if (collision) {
                    let physicsGraphics = getRendering(this.debugRenderings)(
                        pid
                    ) as PIXI.Graphics;

                    const collisionPos = addPoints(
                        c.data.position,
                        collision.data.offSet
                    );

                    if (!physicsGraphics) {
                        physicsGraphics = new PIXI.Graphics();
                        // set the line style to have a width of 5 and set the color to red
                        physicsGraphics.lineStyle(1, 0xff0000);
                        // draw a rectangle
                        physicsGraphics.drawRect(
                            0,
                            0,
                            collision.data.width,
                            collision.data.height
                        );
                        this.stage.addChild(physicsGraphics);
                        addRendering(this.debugRenderings)(
                            pid,
                            physicsGraphics
                        );
                    }

                    physicsGraphics.transform.position.x = collisionPos.x;
                    physicsGraphics.transform.position.y = collisionPos.y;
                }
            }
        }
    }
}
