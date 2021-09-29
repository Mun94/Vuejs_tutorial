import { Ref } from 'vue';
import { TCalculationActions, IButton } from '..';

export * from './common';

// CalculationScreen.vue
export type TProcess = Ref<string> | undefined;
export type TResult = Ref<number> | undefined;
export type TChangeScreen = () => void;

export interface ICalculationScreen {
    name: string;
    setup: () => {
        process: TProcess;
        result: TResult;
        changeScreen: TChangeScreen;
    };
}
// CalculatorPad.vue
export interface ICalculatorPad {
    name: string;
    props: { [key: string]: any };
    components: { Button: IButton };
    setup: () => {
        calculationActions: TCalculationActions
    };
}
