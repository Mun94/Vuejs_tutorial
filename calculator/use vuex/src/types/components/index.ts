import { ComputedRef, Ref } from 'vue';
import { Store } from 'vuex';
import { IButton, IModal } from '..';

export * from './common';

export type TStore = Store<any>;

// CalculationScreen.vue
export type TProcess = ComputedRef<string>
export type TResult = ComputedRef<number>
export type TChangeScreen = () => void;

export interface ICalculationScreen {
    name: string;
    setup: () => {
        process: TProcess,
        result: TResult,
        changeScreen: TChangeScreen
    }
}

// CalculatorPad.vue
interface ICalculatorPadObj {
    value: string;
    type: string;
    otherVal?: unknown | string
}

export type TClickEvent = (val: string, controller: string) => any
export type TCalculatorPadVals = ICalculatorPadObj[][]
export interface ICalculatorPad {
    name: string;
    setup: () => {
        clickEvent: TClickEvent,
        calculatorPadVals: TCalculatorPadVals
    },
    components: { Button: IButton };
}

// RecordPad.vue
export type TModalOpen = Ref<boolean>
export type TRecords = Ref<string[] | string>
export type TRecordVal = string[]
export type TRemoveAllRecord = ComputedRef<string>
export type TToggleModal = (val: boolean) => string

export interface IRecordPad {
    name: string,
    setup: () => {
        modalOpen: TModalOpen,
        records: TRecords,
        removeAllRecord: TRemoveAllRecord,
        toggleModal: TToggleModal
    },
    components: { Modal: unknown | IModal }
}
