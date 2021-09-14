interface stateType {
    clickVal : string;
    process  : string;

    resultVal: number;

    record   : string[];
};

interface IActions {
    cal: (
        { commit, state }: { commit:(s:string, val?: number | string) => void, state: stateType }, 
        payload: { val: string, symbol: string }
    ) => void
};

const state: stateType = {
    clickVal : '',
    process  : '',

    resultVal: 0,

    record   : []
};

let check: boolean = true;
let check2: boolean = true;

const actions : IActions = {
    cal: ({ commit, state }, payload) => {
        const { val, symbol } = payload;

        switch(symbol) {
            case 'operator':          
                if(check) {
                    commit('PROCESS', val);
                    state.clickVal = '';
                    if(state.resultVal) {
                        state.process = '' + state.resultVal;
                        commit('PROCESS', val);
                        state.resultVal = 0;
                    }
                    check = false;
                };
                break;
            case 'number':
                check = true;
                check2 = true;

                commit('CLICK_VAL', val);
                break;
            case 'plusMinus':
                if(state.clickVal.includes('-')) {
                    state.clickVal = state.clickVal.slice(1)
                } else {
                    state.clickVal = '-' + state.clickVal; 
                };
                break;
            case 'equals':
                if(check2) {
                    commit('RESULT');
                    commit('RECORD');
                    state.process  = '' + state.process + state.clickVal;
                    state.clickVal = '' + state.resultVal;
                };
                check2 = false;
                break;
            case 'backspace':
                if(check2) {
                    state.clickVal = state.clickVal.slice(0, -1);
                };
                break;
        };
    },
};

const mutations = {
    'PROCESS': (state: stateType, payload: number | string) => {
        state.process += state.clickVal + payload;
    },
    'CLICK_VAL': (state: stateType, payload: number | string) => {
        state.clickVal += payload;
    },
    'RESULT': (state: stateType) => {
        state.resultVal = eval(`${state.process} ${state.clickVal}`);
    },
    'RECORD': (state: stateType) => {
        state.record = state.record.concat(state.process + state.clickVal) 
    },
    'REMOVE_ALL_RECORD': (state: stateType) => {
        state.record = [];
    }
};

const getters = {
    processVal: (state: stateType) => state.process,
    resultVal: (state: stateType) => state.clickVal,
    recordVal: (state: stateType) => state.record
};

export default {
    state,
    actions,
    mutations,
    getters
};