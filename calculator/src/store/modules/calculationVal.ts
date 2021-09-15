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

let clickNum: boolean = false;
let clickOpe: boolean = false;
let clickEqual: boolean = false;
let clickPlusMinus: boolean = false;
let check: boolean = false;

const actions : IActions = {
    cal: ({ commit, state }, payload) => {
        const { val, symbol } = payload;

        switch(symbol) {
            case 'operator':          
                if(clickNum) {
                    clickOpe = true;
                    commit('PROCESS', val);
                    state.clickVal = '';
                    if(state.resultVal && !clickPlusMinus) {
                        state.process = '' + state.resultVal;
                        commit('PROCESS', val);
                        state.resultVal = 0;
                    };

                    if(state.resultVal && clickPlusMinus) {
                        state.process = '-' + state.resultVal;
                        commit('PROCESS', val);
                        state.resultVal = 0;

                        clickPlusMinus = false;
                    };
                    clickNum = false;
                };
                
                break;
            case 'number':
                clickNum = true;
                commit('CLICK_VAL', val);

                if(clickEqual) {
                    state.clickVal = ''
                    commit('CLICK_VAL', val);
                    clickEqual = false;
                };
                break;
            case 'plusMinus':
                if(state.clickVal.includes('-')) {
                    state.clickVal = state.clickVal.slice(1);
                    state.resultVal = Math.abs(state.resultVal);
                } else {
                    clickPlusMinus = true;
                    state.clickVal = '-' + state.clickVal; 
                };
                break;
            case 'equals':
                if(clickNum && clickOpe) {
                    commit('RESULT');
                    commit('RECORD');
                    state.process  = '' + state.process + state.clickVal;
                    state.clickVal = '' + state.resultVal;
                    clickEqual = true;
                    clickOpe = false;
                };

                if(clickNum && !clickEqual && !clickOpe) {
                    check = true;
                    state.process = `${state.resultVal} + ${Number(state.clickVal)}`;
                    commit('RECORD');
                    commit('RESULT');
                    state.clickVal = '' + state.resultVal;
                    console.log(state.resultVal, state.clickVal);

                    clickEqual = true;
                };
                break;
            case 'backspace':
                if(clickNum && !clickEqual) {
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
        if(check){
            state.resultVal = eval(`${state.process}`);
            check = false;
        } else {
            state.resultVal = eval(`${state.process} ${state.clickVal}`);
        };
    },
    'RECORD': (state: stateType) => {
        if(check) {
            state.record = state.record.concat(state.process)
        } else {
            state.record = state.record.concat(state.process + state.clickVal)
        };
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