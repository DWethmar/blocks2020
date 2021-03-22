import {
    GameObjects,
    addGameObject,
    getGameObject,
    deleteGameObject,
    createGameObject,
} from './gameobject';

test('add GameObject', () => {
    const r: GameObjects = {};
    const g = createGameObject('test');
    expect(addGameObject(r)(g));
});

test('add duplicate GameObject', () => {
    const r: GameObjects = {};
    const g = createGameObject('test');
    addGameObject(r)(g);
    expect(() => addGameObject(r)(g)).toThrow(
        `Game object with id ${g.ID} already exists`
    );
});

test('get GameObject', () => {
    const r: GameObjects = {};
    const g = createGameObject('test');
    addGameObject(r)(g);

    const x = getGameObject(r)(g.ID);
    expect(x).toEqual(
        expect.objectContaining({
            ID: expect.any(String),
            name: 'test',
            parentGameObjectID: null,
        })
    );
});

test('delete GameObject', () => {});

test('delete non existing GameObject', () => {});
