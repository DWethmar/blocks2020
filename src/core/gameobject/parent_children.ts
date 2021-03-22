import { Children } from 'react';

export type ParentChildren = {
    // parent id -> children ids
    [ID: string]: string[];
};

export const getChildren = (parentChildren: ParentChildren) => (
    parentID: string
): string[] => {
    if (parentChildren.hasOwnProperty(parentID)) {
        return parentChildren[parentID];
    }
    return [];
};

export const addChild = (parentChildren: ParentChildren) => (
    parentID: string,
    childID: string
): string[] => {
    if (!parentChildren.hasOwnProperty(parentID)) {
        parentChildren[parentID] = [childID];
    } else {
        if (parentChildren[parentID].includes(childID)) {
            throw `parent already has child with id: ${childID}`;
        } else {
            parentChildren[parentID].push(childID);
        }
    }
    return parentChildren[parentID];
};

export const removeChild = (parentChildren: ParentChildren) => (
    parentID: string,
    childID: string
): string[] => {
    if (parentChildren.hasOwnProperty(parentID)) {
        parentChildren[parentID] = parentChildren[parentID].filter(
            (c) => c != childID
        );
        // Remove empty parent
        if (parentChildren[parentID].length === 0) {
            delete parentChildren[parentID];
        }
    } else {
        throw `No parent with id: ${parentID}`;
    }
    return parentChildren[parentID];
};
