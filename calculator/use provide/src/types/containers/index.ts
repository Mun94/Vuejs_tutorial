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
};

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
    PROCESS: (state: IState, payload: number | string) => string;
    CLICK_VAL: (state: IState, payload: number | string) => string;
    RESULT_AND_RECORD: (state: IState, payload: string) => void;
    CLEAR: (state: IState) => void;
    CLEAR_ENTRY: (state: IState) => string;
    REMOVE_ALL_RECORD: (state: IState) => never[];

    // changeScreenContainer.vue
    CHANGE: (state: Pick<IState, 'check'>) => boolean;
};

export interface IResult {
    process: string;
    result: number | string;
};

export interface IGetters {
    // HomeContainer.vue
    processVal: (state: IState) => string;
    resultVal: (state: IState) => string;
    recordVal: (state: IState) => IResult[];

    // changeScreenContainer.vue
    checkVal: (state: Pick<IState, 'check'>) => boolean;
};