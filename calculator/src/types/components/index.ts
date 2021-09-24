import { ComputedRef } from 'vue';
import { Store } from 'vuex';

export * from './common';

// CalculationScreen.vue
export type TStore = Store<any>;

export interface ISetupComputed {
    process: ComputedRef<string>
    result: ComputedRef<number>
}

export type ValueOf<ISetupComputed> = ISetupComputed[keyof ISetupComputed];

interface ISetupEtc {
    changeScreen: () => void;
}

type TSetupReturn = ISetupComputed & ISetupEtc

export interface ICalculationScreen {
    name: string;
    setup: () => TSetupReturn
}
