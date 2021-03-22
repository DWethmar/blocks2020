export type ComponentData = unknown;

export interface Component {
    id: string;
    gameObjectId: string;
    type: string;
    data: ComponentData;
}

export type Components = {
    [id: string]: Component;
};

export const addComponent = (components: Components) => (
    c: Component
): void => {
    if (!components[c.id]) {
        components[c.id] = c;
    } else {
        throw Error(`Game object with id ${c.id} already exists`);
    }
};

export const getComponent = (components: Components) => (
    id: string
): Component | null => {
    if (components[id]) {
        return components[id];
    }
    return null;
};

export const deleteComponent = (components: Components) => (
    id: string
): boolean => {
    if (components[id]) {
        delete components[id];
        return true;
    }
    return false;
};

export const updateComponent = (components: Components) => (
    id: string,
    data: ComponentData
): boolean => {
    const c = getComponent(components)(id);
    if (c) {
        c.data = data;
        return true;
    }
    return false;
};
