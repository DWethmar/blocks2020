import { addComponent, getComponent, deleteComponent } from './component';
import { createPoint, createPositionComponent } from './position';

test('add component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};

    addComponent(components)(c);
    expect(Object.keys(components)[0]).toBe(c.ID);
});

test('add duplicate component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};

    addComponent(components)(c);

    expect(() => addComponent(components)(c)).toThrowError(
        `Game object with id ${c.ID} already exists`
    );
});

test('get component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};

    addComponent(components)(c);
    const r = getComponent(components)(c.ID);

    expect(r?.ID).toBe(c.ID);
});

test('delete component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};
    addComponent(components)(c);
    expect(deleteComponent(components)(c.ID)).toBeTruthy();
});

test('delete non existing component', () => {
    const c = createPositionComponent('1', createPoint());
    const components = {};
    addComponent(components)(c);
    expect(deleteComponent(components)('x')).toBeFalsy();
});
