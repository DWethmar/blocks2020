export type ComponentData = unknown;

export interface Component {
    ID: string;
    gameObjectID: string;
    type: string;
    data: ComponentData;
}

export type Components = {
    [id: string]: Component;
};

export const addComponent = (components: Components) => (
    c: Component
): void => {
    if (!components[c.ID]) {
        components[c.ID] = c;
    } else {
        throw Error(`Game object with id ${c.ID} already exists`);
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
    component: Component
): boolean => {
    const c = getComponent(components)(component.ID);
    if (c) {
        c.data = component.data;
        return true;
    }
    return false;
};
