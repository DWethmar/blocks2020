import { getChildren, addChild, removeChild } from './parent_children';

test('get children', () => {
    expect(
        getChildren({
            '1': ['2', '3'],
            '2': ['4', '5'],
        })('1')
    ).toStrictEqual(['2', '3']);
});

test('add child', () => {
    const hierarchy = {
        '1': ['2', '3'],
        '2': ['4', '5'],
    };
    const r = addChild(hierarchy)('1', '9');
    expect(r).toStrictEqual(['2', '3', '9']);
});

test('remove child', () => {
    const hierarchy = {
        '1': ['2', '3', '4'],
        '2': ['100', '101'],
    };
    const r = removeChild(hierarchy)('1', '3');
    expect(r).toStrictEqual(['2', '4']);
});
