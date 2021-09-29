export type TCurrentVal = { val: string, filterVal: boolean };

export type TArr = Array<TCurrentVal>;

export type TCallResultRecord = (recordOpt?: string | undefined) => void

export interface IState {
    // HomeContainer.vue
    clickVal : string;
    process : string;
    resultVal: number;
    record : { process: string, result: number | string }[];
    clickStatus: { [key: string]: boolean };

    // changeScreenContainer.vue
    check: boolean;
}

export type TCalculationActions = (payload: { val: string, controller: string }) => void;

// export interface IActions {
//     cal: (
//         { commit, state }:
//             { commit: (key: string, val?: number | string) => void, state: IState },
//         payload:
//             { val: string, controller: string }
//     ) => void;
// };

export interface IMutations {
    // HomeContainer.vue
    PROCESS: (payload: number | string) => string;
    CLICK_VAL: (payload: number | string) => string;
    RESULT_AND_RECORD: (payload?: string) => void;
    CLEAR: () => void;
    CLEAR_ENTRY: () => string;
    REMOVE_ALL_RECORD: () => never[];

    // changeScreenContainer.vue
    CHANGE: () => boolean;
}

export interface IResult {
    process: string;
    result: number | string;
}

export interface IGetters {
    // HomeContainer.vue
    processVal: (state: IState) => string;
    resultVal: (state: IState) => string;
    recordVal: (state: IState) => IResult[];

    // changeScreenContainer.vue
    checkVal: (state: Pick<IState, 'check'>) => boolean;
}
