interface TState {
    clickVal : string;
    process  : string;

    resultVal: number;

    record   : { process: string, result: number | string }[];

    clickStatus: { [key: string]: boolean }; 
};

interface IActions {
    cal: (
        { commit, state }: 
            { commit: (key: string, val?: number | string) => void, state: TState }, 
        payload: 
            { val: string, controller: string }
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
        clickEnter : false,
        clickPlusMinus : false,
        clickClearEntry: false,
        clickCEAfterClickOpe: false,
        clickOnlyNum : false,

        checkCE: false,
        checkInfinityAndNaN: false
    }
};

let { clickNum, clickOpe, clickEnter, clickPlusMinus, clickClearEntry, clickCEAfterClickOpe, clickOnlyNum, checkCE, checkInfinityAndNaN } = state.clickStatus;

const actions : IActions = {
    cal: ({ commit, state }, payload) => {
        const { val, controller } = payload;

        switch(controller) {
            case 'operator': 
                if(state.clickVal.split('').pop() === '.') {
                    return;
                };

                if(clickNum) {
                    if(clickClearEntry) {
                        state.resultVal = 0;
                        state.process = '';
                        clickClearEntry = false;
                        commit('PROCESS', val);
                        state.clickVal = '';
                    } else {
                        if(state.resultVal && !clickPlusMinus) {
                            console.log(111111)
                            // state.resultVal = 0;
                            state.process = '' ;
              
                            commit('PROCESS', val);
                            state.resultVal = 0;
                        } else if(state.resultVal && clickPlusMinus) {
                            state.process = '' ;
                            commit('PROCESS', val);
                            console.log(2222222)
                            state.resultVal = 0;

                            clickPlusMinus = false;
                        } else {
                            if(!eval(state.process+0)) {
                                state.process = ''
                                // state.clickVal = '0'
                            }
                      
                            if(checkInfinityAndNaN) {
                                state.process = ''

                                checkInfinityAndNaN = false;
                            };

                            commit('PROCESS', val);
                            state.resultVal = 0;
                        };

                        state.clickVal = '';
                        clickNum = false;
                    };

                    clickOpe = true;
                };
            
                break;
            case 'number':
                if(val === '.' && (state.clickVal.includes('.') && !clickEnter)) {
                    return;
                };

                clickNum = true;
                
                if(state.clickVal.slice(0, 1) === '0') {
                    state.clickVal = '';
                };

                if(clickEnter) {
                    state.clickVal = '';

                    clickEnter = false;
                };
                
                if(clickClearEntry) {
                    if(Number(state.process.slice(0, 1))) {
                        clickCEAfterClickOpe = true;
                    };
                };

                if(checkInfinityAndNaN) {
                    state.process = ''
                    checkInfinityAndNaN = false;
                };

                commit('CLICK_VAL', val);
                break;
            case 'plusMinus':
                if(state.clickVal.includes('-')) {
                    state.clickVal = state.clickVal.slice(1);
                    state.resultVal = Math.abs(state.resultVal);
                    clickPlusMinus = false;
                } else {
                    state.clickVal = '-' + state.clickVal; 
                    clickPlusMinus = true;
                };
                break;
            case 'enter':
                checkCE = false;
                
                if(clickClearEntry) {
                    if(clickCEAfterClickOpe) {
                        commit('RESULT');
                        commit('RECORD');
                        state.process  = '' + state.process + state.clickVal;
                        state.clickVal = '' + state.resultVal;
                    } else {
                        commit('RESULT');
                        state.process  = '' + state.clickVal + state.process ;
                        commit('RECORD');
                        state.clickVal = '' + state.resultVal;
                    };

                    clickClearEntry = false;
                    clickEnter = true;
                    clickOpe = false;
                } else {
                    if(clickNum && clickOpe) {
                        commit('RESULT');
                        commit('RECORD');
                        state.process  = '' + state.process + state.clickVal;
                        state.clickVal = '' + state.resultVal;
                        clickEnter = true;
                        clickOpe = false;
                    };

                    if(clickNum && !clickEnter && !clickOpe) {
                        clickOnlyNum = true;
                        state.process = `${state.resultVal} + ${Number(state.clickVal)}`;
    
                        commit('RESULT');
                        commit('RECORD');
                        state.clickVal = '' + state.resultVal;

                        clickEnter = true;
                    };
                };
                break;
            case 'backspace':
                if(clickNum && !clickEnter) {
                   return state.clickVal = state.clickVal.slice(0, -1);
                };
                break;
            case 'clear':
                commit('CLEAR');
                break;
            case 'clearEntry':
                clickClearEntry = true;
                state.clickVal = '';

                if(clickEnter) {
                   return commit('CLEAR_ENTRY');  
                };
                break;
        };
    },
};

const mutations = {
    'PROCESS': (state: TState, payload: number | string) => {
        return state.process += state.clickVal + payload;
    },
    'CLICK_VAL': (state: TState, payload: number | string) => {
        return state.clickVal += payload;
    },
    'RESULT': (state: TState) => {
        if(clickClearEntry) {
            if(clickCEAfterClickOpe) {
               clickCEAfterClickOpe = false;

                state.resultVal = eval(`${state.process} ${state.clickVal}`);
            } else {
                console.log(state.clickVal);
                console.log(state.process)
                state.resultVal = eval(state.clickVal + state.process );
            };

            if(!isFinite(state.resultVal)) {
                checkInfinityAndNaN = true;
   
                state.resultVal = 0;
            };
        } else {
            if(clickOnlyNum){
                state.resultVal = eval(`${state.process}`);
                clickOnlyNum = false;
            } else {
                state.resultVal = eval(`${state.process} ${state.clickVal}`);
            };

            if(!isFinite(state.resultVal)) {
                checkInfinityAndNaN = true;
            
                state.resultVal = 0;
            };
        };
    },
    'RECORD': (state: TState) => {
        if(clickOnlyNum) {
            return state.record = state.record.concat({
                process: state.process, 
                result: state.clickVal,
            });
        } else {
            if(!clickOpe) {
                return state.record = state.record.concat({process: state.process, result: state.resultVal});
            } else {
                return state.record = state.record.concat({process:state.process + state.clickVal, result: state.resultVal});
            };
        };
    },
    'CLEAR': (state: TState) => {
        state.clickVal = '';
        state.process = '';
        state.resultVal = 0;
    },
    'CLEAR_ENTRY': (state: TState) => {
        let firstInput = true;

        if(clickEnter && !checkCE) {
            checkCE = true;
            return state.process = state.process.split('').map((val, i) => {
                if (isNaN(Number(val)) && i !== 0) {
                    firstInput = false;
                };
            
                return firstInput ? "" : val;
            }).join(''); 
        } else {
            return state.clickVal = '';
        };
    },
    'REMOVE_ALL_RECORD': (state: TState) => {
        return state.record = [];
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