import { KeyUtil } from './key-utl';

export class KeyInput {

    private keys: { [code: string]: string } = {};
    // private nextKeys: { [code: string]: string } = {};

    constructor() {
        window.addEventListener('keydown', this.keydownListener.bind(this), false);
        window.addEventListener('keyup', this.keyupListener.bind(this), false);

        this.keys = {};
    }

    public update() {
        if (Object.keys(this.keys).length) {
            console.log(this.keys);
        }
    }

    public isKeyPressed(value: string) {
        return this.keys.hasOwnProperty(value);
    }

    public onDestroy() {
        window.removeEventListener('keydown', this.keydownListener);
        window.removeEventListener('keyup', this.keyupListener);
    }

    private keydownListener(event: KeyboardEvent) {
        const name = KeyUtil.codeToKey('' + event.keyCode);
        if (name !== '') {
            this.keys[name] = event.code;
        }
    }

    private keyupListener(event: KeyboardEvent) {
        const name = KeyUtil.codeToKey('' + event.keyCode);
        if (name !== '') {
            delete this.keys[name];
        }
    }
}
