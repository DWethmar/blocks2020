import * as PIXI from 'pixi.js';
import { System } from '../core/system';
import { Events } from '../core/events';
import { GameEngine, POSITION_COMPONENT } from './game_engine';
import { Renderings, addRendering, getRendering } from './render/renderings';

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
            let gid = `${c.ID}_graphics`;
            let graphics = getRendering(this.debugRenderings)(
                gid
            ) as PIXI.Graphics;

            if (!graphics) {
                graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff);
                graphics.drawCircle(0, 0, 2);
                graphics.endFill();
                this.stage.addChild(graphics);
                addRendering(this.debugRenderings)(gid, graphics);
            }
            graphics.transform.position.x = c.data.position.x;
            graphics.transform.position.y = c.data.position.y;

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
        }
    }
}
