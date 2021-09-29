import { ICalculatorPad } from '..';

export * from './homeContainer';

// CalculatorPadCon.vue
export type TCalculatorPadVals = {
    value: string;
    type: string;
    otherVal?: unknown | string;
}[][]

export interface ICalculatorPadCon {
    name: string;
    setup: () => {
        calculatorPadVals: TCalculatorPadVals;
    };
    components: { CalculatorPad: ICalculatorPad};
}
