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
        clickCENumAfterOpe: false,
        clickOnlyNum : false,

        checkCE: false,
        checkInfinityAndNaN: false
    }
};

let { clickNum, clickOpe, clickEnter, clickPlusMinus, clickClearEntry, clickCENumAfterOpe, clickOnlyNum, checkCE, checkInfinityAndNaN } = state.clickStatus;

const actions : IActions = {
    cal: ({ commit, state }, payload) => {
        const { val, controller } = payload;

        switch(controller) {
            case 'operator': 
                if(state.clickVal.slice(-1) === '.') { // '.' 다음에 바로 연산자가 오지 않게
                    return;
                };

                if(clickNum) { // 숫자 클릭 후 연산자 사용 가능, 연산자 클릭 후 또 연산자 클릭 못 하게
                    if(clickClearEntry) { // CE 눌렀을 때
                        state.resultVal = 0;
                        state.process = '';
              
                        commit('PROCESS', val);
                        state.clickVal = '';

                        clickClearEntry = false;
                    } else { 
                        if(state.resultVal && !clickPlusMinus) { // 결과 값이 있으면서 '+/-'버튼을 클릭했을 때
                            state.process = '' ;
              
                            commit('PROCESS', val);
                            state.resultVal = 0;
                        } else if(state.resultVal && clickPlusMinus) { // 결과 값이 있으면서 '+/-'버튼을 클릭했을 때
                            state.process = '' ;

                            commit('PROCESS', val);
                            state.resultVal = 0;

                            clickPlusMinus = false;
                        } else {
                            if(state.process.split('-')[0] === state.process.split('-')[1] || state.process.includes('*0')) {
                                state.process = ''
                            }; // 이전 계산 결과값이 0 이면

                            if(state.process.includes('0*') || state.process.includes('0/')) {
                                state.process = ''
                                state.clickVal = '0'
                            }; // 계산 결과값이 없거나 계산식에 0*, 0/ 이 있으면 
                      
                            if(checkInfinityAndNaN) { // 값이 무한인지 확인
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
                }; // '.' 을 여러번 클릭해도 한번만 입력 되게

                clickNum = true;
                
                if(state.clickVal.slice(0, 1) === '0') {
                    state.clickVal = '';
                }; // 첫 자리 수가 0 일때 0이 여러번 클릭 되지 않게

                if(clickEnter) { 
                    state.clickVal = '';

                    clickEnter = false;
                };
                
                if(clickClearEntry) { // 다음 숫자 누르기 이전에 숫자, 연산자 클릭 후 ce 버튼을 눌렀을 때
                    if(Number(state.process.slice(0, 1))) {
                        clickCENumAfterOpe = true;
                    };
                };

                if(checkInfinityAndNaN) { // 이전 계산 값이 무한이면
                    state.process = ''
                    checkInfinityAndNaN = false;
                };

                commit('CLICK_VAL', val);
                break;
            case 'plusMinus':
                if(state.clickVal.includes('-')) { // '+ / -' 변환
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
                
                if(clickClearEntry) { // CE를 누른 상태
                    if(clickCENumAfterOpe) { // 숫자 클릭 -> 연산자 -> CE -> 숫자 -> 엔터                
                        commit('RESULT');
                        commit('RECORD');
      
                        state.process  = '' + state.process + state.clickVal;
                        state.clickVal = '' + state.resultVal;
                    } else {
                        if(!Number(state.process.slice(-1))) { // 숫자 클릭 -> CE -> 숫자 -> 엔터
                            if(state.process.includes('*0')) {
                                commit('RESULT');
                                state.process  = state.clickVal + state.process;
                                commit('RECORD', 'true');
                            } else {
                                commit('RESULT');
                                state.process  = '0 +' + state.process + state.clickVal;
                                commit('RECORD', 'true');
                            };
                        } else { // 숫자 클릭 -> 연산자 -> 숫자 -> 엔터 -> CE -> 숫자 -> 엔터
                            commit('RESULT');
                            state.process  = '' + state.clickVal + state.process;
                            commit('RECORD');
                        };
                        state.clickVal = '' + state.resultVal;
                    };

                    clickClearEntry = false;
                    clickEnter = true;
                    clickOpe = false;
                } else {
                    if(clickNum && clickOpe) { // 숫자 클릭 -> 연산자 -> 숫자 클릭 -> 엔터
                        commit('RESULT');
                        commit('RECORD');
                       
                        state.process  = '' + state.process + state.clickVal;
                        state.clickVal = '' + state.resultVal;
                        clickEnter = true;
                        clickOpe = false;
                    };

                    if(clickNum && !clickEnter && !clickOpe) { // 숫자만 클릭 -> 엔터
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
                if(clickNum && !clickEnter) { // 숫자를 누르고 엔터 키를 누르지 않았을 때 (숫자 키를 누르면 clickEnter 초기화 됨 이렇게 안 하면 계산된 값이 지워질 수 있음)
                   return state.clickVal = state.clickVal.slice(0, -1);
                };
                break;
            case 'clear':
                commit('CLEAR'); // 초기화
                break;
            case 'clearEntry':
                clickClearEntry = true;
                state.clickVal = '';
            
                commit('CLEAR_ENTRY');  
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
            if(clickCENumAfterOpe) {
                clickCENumAfterOpe = false;

                state.resultVal = eval(`${state.process} ${state.clickVal}`);
            } else {
                if(!Number(state.process.slice(-1))) {
                    if(state.process.includes('*0')) {
                        state.resultVal = eval(state.clickVal + state.process);
                    } else {
                        state.resultVal = eval(state.process + state.clickVal);
                    };
                } else {
                    state.resultVal = eval(state.clickVal + state.process);
                };
            };

        } else {
            if(clickOnlyNum){
                state.resultVal = eval(`${state.process}`);
                clickOnlyNum = false;
            } else {
                state.resultVal = eval(`${state.process} ${state.clickVal}`);
            };
        };

        if(!isFinite(state.resultVal)) { // 결과 값이 무한인지 확인
            checkInfinityAndNaN = true;

            state.resultVal = 0;
        };
    },
    'RECORD': (state: TState, payload: boolean) => {
        if(clickOnlyNum) {
            return state.record = state.record.concat({process: state.process, result: state.clickVal});
        } else {
            if(!clickOpe || payload) {
                return state.record = state.record.concat({process: state.process, result: state.resultVal});
            } else {
                return state.record = state.record.concat({process: state.process + state.clickVal, result: state.resultVal});
            };
        };
    },
    'CLEAR': (state: TState) => {
        state.clickVal = '';
        state.process = '';
        state.resultVal = 0;
        
        clickNum = false;
    },
    'CLEAR_ENTRY': (state: TState) => {
        let filterVal = true;

        if(!checkCE) { // CE가 여러번 눌리지 않게
            checkCE = true;
            const arr = state.process.split('').reverse().map((val, i) => {
                if (isNaN(Number(val)) && i !== 0) {
                    filterVal = false;
                };
            
                return { val, filterVal } ;
            });

            return state.process = arr.reduce((be:any, cur, i) => { // 가장 최근 입력한 값만 남기고 모두 삭제
                return cur.filterVal || (arr[i-1].filterVal || arr[i-1].val === '.')?
                     be.concat(cur.val) : be.concat('')
            }, []).reverse().join('');
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