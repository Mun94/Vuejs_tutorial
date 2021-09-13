interface stateType {
    result: string;
    process: string;

    testVal: number;
};

const state: stateType = {
    result: '',
    process: '',

    testVal: 0
};

let check = true;
const actions = {
    cal: ({ commit, state }: any, payload: {val: string, symbol: string}) => {
        const { val, symbol } = payload;

        switch(symbol) {
            case 'operator':
                if(check) {
                    commit('Process', val);
                    state.result = '';
                    if(state.testVal) {
                        state.process = '' + state.testVal;
                        commit('Process', val);
                        state.testVal = 0
                    }
                    check = false;
                };
                break;
            case 'number':
                check = true;

                commit('Result', val);
                break;
            case 'equals':
                commit('Test');
        }
    }
};

const mutations = {
    'Process': (state: stateType, payload: any) => {
        state.process += state.result + payload;
    },
    'Result': (state: stateType, payload: any) => {
        state.result += payload;
    },
    'Test': (state: stateType, payload: any) => {
        state.testVal = eval(`${state.process} ${state.result}`);
        state.process = '' + state.process + state.result
        state.result = ''+state.testVal
    }
};

const getters = {
    processVal: (state: stateType) => state.process,
    resultVal: (state: stateType) => state.result
};

export default {
    state,
    actions,
    mutations,
    getters
};