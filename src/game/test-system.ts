import * as PIXI from 'pixi.js';
import { System } from '../core/system';
import { Events } from '../core/events';
import { GameEngine, POSITION_COMPONENT } from './game_engine';
import { Renderings, addRendering, getRendering } from './render/renderings';
import { addPoints } from '../core/point-3d';
import { COLLISION_COMPONENT } from './collision/collision';

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

    update(engine: GameEngine, deltaTime: number) {
        for (const c of engine.getComponentsByType(POSITION_COMPONENT)) {
            // Debug position
            let gid = `${c.ID}_graphics`;
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

            let tid = `${c.ID}_text`;
            let textGraphic = getRendering(this.debugRenderings)(
                tid
            ) as PIXI.Text;
            let debugText = `x:${Math.floor(c.data.position.x)}\ny:${Math.floor(
                c.data.position.y
            )}\nz:${Math.floor(c.data.position.z)}`;

            if (!textGraphic) {
                textGraphic = new PIXI.Text(debugText, {
                    fontFamily: 'Arial',
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

            // physics debug
            // Debug graphics
            let pid = `${c.ID}_physics`;
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
                    addRendering(this.debugRenderings)(pid, physicsGraphics);
                }
                physicsGraphics.transform.position.x = collisionPos.x;
                physicsGraphics.transform.position.y = collisionPos.y;
            }
        }
    }
}
