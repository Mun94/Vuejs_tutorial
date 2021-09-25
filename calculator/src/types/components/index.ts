import { ComputedRef, Ref } from 'vue';
import { Store } from 'vuex';
import { IButton, IModal } from './common';

export * from './common';

// CalculationScreen.vue
export type TStore = Store<any>;

export type TProcess = ComputedRef<string>

export type TResult = ComputedRef<number>

interface ISetupComputed {
    process: TProcess;
    result: TResult;

    removeAllRecord: TRemoveAllRecord;
}

// 공용으로 사용
interface ISetupRef {
    calculatorPadVals: TCalculatorPadVals

    modalOpen: TModalOpen;
    records: TRecords;
}

// export type test<testype> = ComputedRef<testype>

interface ISetupEtc {
    changeScreen: () => void;

    clickEvent: TClickEvent

    toggleModal: () => void;
}
export interface ICalculationScreen {
    name: string;
    setup: () =>
        Pick<ISetupComputed, 'process' | 'result'> &
        Pick<ISetupEtc, 'changeScreen'>
}

// CalculatorPad.vue
interface ICalculatorPadObj {
    value: string;
    type: string;
    otherVal?: unknown | string
}

export type TClickEvent = (val: string, controller: string) => any

export type TCalculatorPadVals = Ref<ICalculatorPadObj[][]>
export interface ICalculatorPad {
    name: string;
    setup: () =>
        Pick<ISetupEtc, 'clickEvent'> &
        Pick<ISetupRef, 'calculatorPadVals'>,
    components: { Button: IButton };
}

// RecordPad.vue
export type TModalOpen = Ref<boolean>

export type TRecords = Ref<string[] | string>

export type TRemoveAllRecord = ComputedRef<string>

export type TToggleModal = (val: boolean) => string

export interface IRecordPad {
    name: string,
    setup: () =>
        Pick<ISetupComputed, 'removeAllRecord'> &
        Pick<ISetupRef, 'modalOpen' | 'records'> &
        Pick<ISetupEtc, 'toggleModal'>,
    components: { Modal: unknown | IModal }
}
