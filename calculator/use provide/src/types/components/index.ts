import { Ref } from 'vue';
import {
  TCalculationActions, IButton, IModal, IProps,
} from '..';

export * from './common';

// CalculationScreen.vue
export type TChangeComponent = (() => void) | undefined;
export type TProcess = Ref<string> | undefined;
export type TResult = Ref<number> | undefined;

export interface ICalculationScreen {
    name: string;

    setup: () => {
        process: TProcess;
        result: TResult;
        changeComponent: TChangeComponent;
    };
}
// CalculatorPad.vue
export interface ICalculatorPad {
    name: string;
    props: IProps;
    components: { Button: IButton };

    setup: () => {
        calculationActions: TCalculationActions
    };
}

// RecordPad.vue
export interface IRecordPad {
    name: string;
    props: IProps;
    components: { Modal: unknown | IModal }
}
