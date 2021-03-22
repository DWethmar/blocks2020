import { addComponent, getComponent } from './component';
import { createPoint, createPositionComponent } from './position';

test('add component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};

    addComponent(components)(c);
    expect(Object.keys(components)[0]).toBe(c.id);
});

test('get component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};

    addComponent(components)(c);
    const r = getComponent(components)(c.id);

    expect(r.id).toBe(c.id);
});
