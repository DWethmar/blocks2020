import * as React from 'react';
import { throttleTime } from 'rxjs/operators';

import { useEffect, useState, useMemo } from 'react';
import { GameEngine } from '../game/game_engine';
import { State } from '../core/state';
import { Component } from '../core/component/component';

export interface ComponentProps {
    component: Component;
}

export const InspectComponent: React.FunctionComponent<ComponentProps> = ({
    component,
}) => {
    return (
        <div>
            <div>{component.ID}</div>
            <div>{component.type}</div>
            <div>{JSON.stringify(component.data, null, 4)}</div>
        </div>
    );
};
