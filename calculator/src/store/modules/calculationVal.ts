interface stateType {
    clickVal: string;
    process: string;

    resultVal: number;

    record: string[];
};

const state: stateType = {
    clickVal: '',
    process: '',

    resultVal: 0,

    record: []
};

let check = true;
let check2 = true;

const actions = {
    cal: ({ commit, state }: any, payload: {val: string, symbol: string}) => {
        const { val, symbol } = payload;

        switch(symbol) {
            case 'operator':          
                if(check) {
                    commit('Process', val);
                    state.clickVal = '';
                    if(state.resultVal) {
                        state.process = '' + state.resultVal;
                        commit('Process', val);
                        state.resultVal = 0;
                    }
                    check = false;
                };
                break;
            case 'number':
                check = true;
                check2 = true;

                commit('ClickVal', val);
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
                    commit('Result');
                    commit('Record');
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
    'Process': (state: stateType, payload: any) => {
        state.process += state.clickVal + payload;
    },
    'ClickVal': (state: stateType, payload: any) => {
        state.clickVal += payload;
    },
    'Result': (state: stateType, payload: any) => {
        state.resultVal = eval(`${state.process} ${state.clickVal}`);
    },
    'Record': (state: stateType, payload: any) => {
        state.record = state.record.concat(state.process+state.clickVal) 
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