import { Ref, ComputedRef, ToRefs } from 'vue';
import {
  ICalculationScreen, ICalculatorPad, IRecordPad,
} from '..';

// CalculationScreen.vue
export interface ICalculationScreenCon {
    name: string;
    components: { CalculationScreen: unknown | ICalculationScreen };
}

// CalculatorPadCon.vue
export type TCalculatorPadVals = {
    value: string;
    type: string;
    otherVal?: unknown | string;
}[][]

export interface ICalculatorPadCon {
    name: string;
    components: { CalculatorPad: unknown | ICalculatorPad };

    setup: () => {
        calculatorPadVals: TCalculatorPadVals;
    };
}

// RecordPadCon.vue
export type TModalOpen = Ref<boolean>;
export type TClickRemove = () => void;
export type TCloseModal = (val: boolean) => void;
type TRecord = { process: string, result: number | string };
export type TRecords = Ref<TRecord[]> | undefined;
export type TRemoveAllRecord = (() => []) | undefined;

export interface IRecordPadCon {
    name: string;
    components: { RecordPad: unknown | IRecordPad };

    setup: () => {
        records: TRecords;
        clickRemove: TClickRemove;
    };
}

// index.vue
export type TCurrentVal = { val: string, filterVal: boolean };
export type TArr = Array<TCurrentVal>;
export type TCallResultRecord = (recordOpt?: string | undefined) => void;

export type TTogglePad = ComputedRef<IRecordPadCon | ICalculatorPadCon>

export interface IState {
    // HomeContainer.vue
    clickVal : string;
    process : string;
    resultVal: number;
    record : TRecord[];
    clickStatus: { [key: string]: boolean };

    // changeScreenContainer.vue
    check: boolean;
}

export type TCalculationActions = (payload: { val: string, controller: string }) => void;

export interface IMutations {
    // HomeContainer.vue
    PROCESS: (payload: number | string) => string;
    CLICK_VAL: (payload: number | string) => string;
    RESULT_AND_RECORD: (payload?: string) => void;
    CLEAR: () => void;
    CLEAR_ENTRY: () => string;
    REMOVE_ALL_RECORD: () => [];

    // changeScreenContainer.vue
    CHANGE: () => boolean;
}

export interface IResult {
    process: string;
    result: number | string;
}

export type TToRefs = ToRefs<Pick<IState, 'resultVal' | 'clickVal' | 'process' | 'record' | 'clickStatus'>>
export interface IIndex {
    name: string;
    components: {
        CalculatorPadCon: ICalculatorPadCon;
        CalculationScreenCon: ICalculationScreenCon;
    };
    setup: () => {
        togglePad: TTogglePad
    }
}
