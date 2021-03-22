import { addComponent, getComponent, deleteComponent } from './component';
import { createPoint, createPositionComponent } from './position';

test('add component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};

    addComponent(components)(c);
    expect(Object.keys(components)[0]).toBe(c.id);
});

test('add component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};

    addComponent(components)(c);

    expect(() => addComponent(components)(c)).toThrowError(
        `Game object with id ${c.id} already exists`
    );
});

test('get component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};

    addComponent(components)(c);
    const r = getComponent(components)(c.id);

    expect(r?.id).toBe(c.id);
});

test('delete component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};
    addComponent(components)(c);
    expect(deleteComponent(components)(c.id)).toBeTruthy();
});

test('delete non existing component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};
    addComponent(components)(c);
    expect(deleteComponent(components)('x')).toBeFalsy();
});
