export * from './common';

import { IButton } from '..';

// CalculatorPad.vue
interface ICalculatorPadObj {
    value: string;
    type: string;
    otherVal?: unknown | string
};

export type TClickEvent = (val: string, controller: string) => any;
export type TCalculatorPadVals = ICalculatorPadObj[][];
export interface ICalculatorPad {
    name: string;
    setup: () => {
        clickEvent: TClickEvent,
        calculatorPadVals: TCalculatorPadVals
    },
    components: { Button: IButton }
};