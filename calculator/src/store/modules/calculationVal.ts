interface TState {
    clickVal : string;
    process  : string;

    resultVal: number;

    record   : { process: string, result: number | string }[];

    clickStatus: { [key: string]: boolean }; 
};

interface IActions {
    cal: (
        { commit, state }: { commit: (s:string, val?: number | string) => void, state: TState }, 
        payload: { val: string, symbol: string }
    ) => void
};

const state: TState = {
    clickVal : '',
    process  : '',

    resultVal: 0,

    record   : [],

    clickStatus: {
        clickNum : false,
        clickOpe : false,
        clickEqual : false,
        clickPlusMinus : false,
        clickClearEntry: false,
        check : false,
        check2 : false,
    }
};

let { clickNum, clickOpe, clickEqual, clickPlusMinus, clickClearEntry, check, check2 } = state.clickStatus;

const actions : IActions = {
    cal: ({ commit, state }, payload) => {
        const { val, symbol } = payload;

        switch(symbol) {
            case 'operator': 

                if(clickNum) {
                    if(clickClearEntry) {
                        state.resultVal = 0;
                        state.process = ''
                        clickClearEntry = false;
                        commit('PROCESS', val);
                        state.clickVal = '';
                    } else {
                        if(state.resultVal && !clickPlusMinus) {
                            if(check2) {
                                state.resultVal = 0;
                                state.process = ''
                                check2 = false;
                            } else {
                                state.resultVal = 0;
                                state.process = '' ;
                            };

                            commit('PROCESS', val);
                            state.resultVal = 0;
                        } else if(state.resultVal && clickPlusMinus) {
                            state.process = '' ;
                            commit('PROCESS', val);

                            state.resultVal = 0;

                            clickPlusMinus = false;
                        } else {
                            commit('PROCESS', val);
                        };

                        state.clickVal = '';
                        clickNum = false;
                };
                clickOpe = true;
            };
            
                break;
            case 'number':
                clickNum = true;

                commit('CLICK_VAL', val);

                if(clickEqual) {
                    state.clickVal = '';
                    if(!clickOpe) {
                        check2 = true;
                    };
                    commit('CLICK_VAL', val);

                    clickEqual = false;
                };
                break;
            case 'plusMinus':
                if(state.clickVal.includes('-')) {
                    state.clickVal = state.clickVal.slice(1);
                    state.resultVal = Math.abs(state.resultVal);
                    clickPlusMinus = false;
                } else {
                    clickPlusMinus = true;
                    state.clickVal = '-' + state.clickVal; 
                };
                break;
            case 'equals':
                if(clickClearEntry) {
                    commit('RESULT');
                    commit('RECORD');

                    console.log(eval(state.clickVal+state.process))
                    state.process  = '' + state.clickVal + state.process ;
                    state.clickVal = '' + state.resultVal;

                    clickClearEntry = false;
                    clickEqual = true;
                    clickOpe = false;
                } else {
                    if(clickNum && clickOpe) {
                        commit('RESULT');
                        commit('RECORD');
                        console.log(2)
                        state.process  = '' + state.process + state.clickVal;
                        state.clickVal = '' + state.resultVal;
                        clickEqual = true;
                        clickOpe = false;
                    };

                    if(clickNum && !clickEqual && !clickOpe) {
                        console.log(2)
                        check = true;
                        state.process = `${state.resultVal} + ${Number(state.clickVal)}`;
    
                        commit('RESULT');
                        commit('RECORD');
                        state.clickVal = '' + state.resultVal;

                        clickEqual = true;
                    };
                };
                break;
            case 'backspace':
                if(clickNum && !clickEqual) {
                    state.clickVal = state.clickVal.slice(0, -1);
                };
                break;
            case 'clear':
                commit('CLEAR');
                break;
            case 'clearEntry':
                clickClearEntry = true;
                commit('CLEAR_ENTRY');
                break;
        };
    },
};

const mutations = {
    'PROCESS': (state: TState, payload: number | string) => {
        state.process += state.clickVal + payload;
    },
    'CLICK_VAL': (state: TState, payload: number | string) => {
        state.clickVal += payload;
    },
    'RESULT': (state: TState, payload: number) => {
        if(clickClearEntry) {
            state.resultVal = eval(state.clickVal + state.process);
        } else {
        if(check){
            state.resultVal = eval(`${state.process}`);
            check = false;
        } else {
            state.resultVal = eval(`${state.process} ${state.clickVal}`);
        };}
    },
    'RECORD': (state: TState) => {
        if(check) {
            state.record = state.record.concat({process: state.process, result: state.clickVal});
        } else {
            if(!clickOpe) {
                state.record = state.record.concat({process: state.process, result: state.resultVal});
            } else {
                state.record = state.record.concat({process:state.process + state.clickVal, result: state.resultVal});
            };
        };
    },
    'CLEAR': (state: TState) => {
        state.clickVal = '';
        state.process = '';
        state.resultVal = 0;
    },
    'CLEAR_ENTRY': (state: TState) => {
        state.clickVal = '';

        if(clickEqual) {
            let check = true;
            state.process = state.process.split('').map((val, i) => {
                if (isNaN(Number(val)) && i !== 0) {
                    check = false;
                };
            
                return check ? "" : val;
            }).join(''); 
        };
    },
    'REMOVE_ALL_RECORD': (state: TState) => {
        state.record = [];
    },
};

const getters = {
    processVal: (state: TState) => state.process,
    resultVal: (state: TState) => state.clickVal,
    recordVal: (state: TState) => state.record
};

export default {
    state,
    actions,
    mutations,
    getters
};