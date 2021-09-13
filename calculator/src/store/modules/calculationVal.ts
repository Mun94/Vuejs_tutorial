interface stateType {
    clickVal: string;
    process: string;

    resultVal: number;
};

const state: stateType = {
    clickVal: '',
    process: '',

    resultVal: 0
};

let check = true;
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
                        state.resultVal = 0
                    }
                    check = false;
                };
                break;
            case 'number':
                check = true;
                commit('ClickVal', val);
                break;
            case 'equals':
                commit('Result');
                state.process  = '' + state.process + state.clickVal
                state.clickVal = '' + state.resultVal
                break;
            case 'backspace':
                state.clickVal = state.clickVal.slice(0, -1);
                break;
        };
    }
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
    }
};

const getters = {
    processVal: (state: stateType) => state.process,
    resultVal: (state: stateType) => state.clickVal
};

export default {
    state,
    actions,
    mutations,
    getters
};