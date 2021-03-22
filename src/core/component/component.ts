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

export const addComponent = (components: Components) => (c: Component) =>
    (components[c.id] = c);

export const getComponent = (components: Components) => (id: string) =>
    components[id];

export const deleteComponent = (components: Components) => (id: string) =>
    delete components[id];

export const updateComponent = (components: Components) => (
    id: string,
    data: ComponentData
) => (getComponent(components)(id).data = data);
