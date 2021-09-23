interface IState {
    clickVal : string;
    process  : string;

    resultVal: number;

    record   : { process: string, result: number | string }[];

    clickStatus: { [key: string]: boolean }; 
};

interface IActions {
    cal: (
        { commit, state }: 
            { commit: (key: string, val?: number | string) => void, state: IState }, 
        payload: 
            { val: string, controller: string }
    ) => void
};

interface IMutations {
    PROCESS: (state: IState, payload: number | string) => string;
    CLICK_VAL: (state: IState, payload: number | string) => string;
    RESULT_AND_RECORD: (state: IState, payload: string) => void;
    CLEAR: (state: IState) => void;
    CLEAR_ENTRY: (state: IState) => string;
    REMOVE_ALL_RECORD: (state: IState) => never[];
};

interface IGetters {
    processVal: (state: IState) => string;
    resultVal: (state: IState) => string;
    recordVal: (state: IState) => IResult[];
};
interface IResult { 
    process: string;
    result: number | string;
};

type TCurrentVal = { val: string, filterVal: boolean };

type TArr = Array<TCurrentVal>;

const state: IState = {
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

        checkCE: false,
        checkInfinityAndNaN: false
    }
};

let { clickNum, clickOpe, clickEnter, clickPlusMinus, clickClearEntry, clickCENumAfterOpe, checkCE, checkInfinityAndNaN } = state.clickStatus

const actions: IActions = {
    cal: ({ commit, state }, payload) => {
        const { val, controller } = payload;

        switch(controller) {
            case 'operator': 
                if(state.clickVal.slice(-1) === '.') { // '.' 다음에 바로 연산자가 오지 않게
                    return;
                };

                const callProcess = (): void => {
                    state.process = '';
              
                    commit('PROCESS', val);
                    state.resultVal = 0;
                };

                if(clickNum) { // 숫자 클릭 후 연산자 사용 가능, 연산자 클릭 후 또 연산자 클릭 못 하게
                    if(clickClearEntry) { // CE 눌렀을 때
                        callProcess();
                        
                        state.clickVal = '';

                        clickClearEntry = false;
                    } else { 
                        if(state.resultVal && !clickPlusMinus) { // 결과 값이 있으면서 '+/-'버튼을 클릭했을 때
                            callProcess();
                        } else if(state.resultVal && clickPlusMinus) { // 결과 값이 있으면서 '+/-'버튼을 클릭했을 때
                            callProcess();

                            clickPlusMinus = false;
                        } else {
                            if(state.process.split('-')[0] === state.process.split('-')[1] || state.process.includes('*0')) { // 이전 계산 결과값이 0 이면
                                state.process = '';
                            }; 
                            
                            if(state.process.includes('0*') || state.process.includes('0/')) { // 계산 결과값이 없거나 계산식에 0*, 0/ 이 있으면
                                state.process = '';

                                state.clickVal = '0';
                            }; 
                            
                            if(checkInfinityAndNaN) { // 값이 무한인지 확인
                                state.process = '';

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

                clickNum = true;
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
                
                const callResultRecord = (recordOpt?: string): void => {
                    if(recordOpt) {
                        commit('RESULT_AND_RECORD', recordOpt);
                    } else {
                        commit('RESULT_AND_RECORD');
                    };
                };

                if(clickClearEntry) { // CE를 누른 상태
                    if(clickCENumAfterOpe) { // 숫자 클릭 -> 연산자 -> CE -> 숫자 -> 엔터                
                        callResultRecord('addProcessFirst')
                    } else {
                        if(!state.process) { // 숫자 클릭 -> CE -> 숫자 -> 엔터
                            callResultRecord('addZeroFirst');
                        } else { // 숫자 클릭 -> 연산자 -> 숫자 -> 엔터 -> CE -> 숫자 -> 엔터
                            callResultRecord('addClickValFirst');
                        }; 
                    };
                   
                    clickClearEntry = false;
                    clickEnter = true;
                    clickOpe = false;
                } else {
                    if(clickNum && clickOpe) { // 숫자 클릭 -> 연산자 -> 숫자 클릭 -> 엔터
                        callResultRecord('addProcessFirst');
                
                        clickEnter = true;
                        clickOpe = false;
                    };

                    if(clickNum && !clickEnter && !clickOpe) { // 숫자만 클릭 -> 엔터
                        state.process = `${state.resultVal} + ${Number(state.clickVal)}`;
                        callResultRecord();

                        clickEnter = true;
                    };
                };
                state.clickVal = '' + state.resultVal;
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

const mutations: IMutations = {
    'PROCESS': (state, payload) => {
        return state.process += state.clickVal + payload;
    },
    'CLICK_VAL': (state, payload) => {
        return state.clickVal += payload;
    },
    'RESULT_AND_RECORD': (state, payload) => {
        switch(payload) {
            case 'addClickValFirst':
                const sum: string = '' + state.clickVal + state.process;

                state.resultVal = eval(sum);
                state.record = state.record.concat({process: state.process = sum, result: state.resultVal} as IResult);
                break;
            case 'addZeroFirst':
                const sum2: string = '0+' + state.process + state.clickVal;

                state.resultVal = eval(sum2);
                state.record = state.record.concat({process: state.process = sum2, result: state.resultVal} as IResult);
                break;
            case 'addProcessFirst':
                clickCENumAfterOpe = false;
                
                const sum3: string = '' + state.process + state.clickVal;
                state.resultVal = eval(sum3);
                state.record = state.record.concat({process: state.process = sum3, result: state.resultVal } as IResult);
                break;
            default: // 숫자만 클릭
                state.resultVal = eval(state.process);
                state.record = state.record.concat({process: state.process, result: state.resultVal} as IResult);
                break;   
        };

        if(!isFinite(state.resultVal)) { // 결과 값이 무한인지 확인
            checkInfinityAndNaN = true;

            state.resultVal = 0;
        };
    },
    'CLEAR': state => {
        state.clickVal = '';
        state.process = '';
        state.resultVal = 0;
        
        clickNum = false;
    },
    'CLEAR_ENTRY': state => {
        let filterVal = true;

        if(!checkCE) { // CE가 여러번 눌리지 않게
            checkCE = true;
            const arr: TArr = state.process.split('').reverse().map((val: string, i: number): TCurrentVal => {
                if (isNaN(Number(val)) && i !== 0) {
                    filterVal = false;
                };
            
                return { val, filterVal } ;
            });

            return state.process = arr.reduce((be: string[], cur: TCurrentVal, i: number): string[] => { // 가장 최근 입력한 값만 남기고 모두 삭제
                return cur.filterVal || (arr[i - 1].filterVal || arr[i - 1].val === '.') ?
                     be.concat(cur.val) : be.concat('')
            }, []).reverse().join('');
        } else {
            return state.clickVal = '';
        };
    },
    'REMOVE_ALL_RECORD': state => {
        return state.record = [];
    },
};

const getters: IGetters = {
    processVal: state => state.process,
    resultVal: state => state.clickVal,
    recordVal: state => state.record
};

export default {
    state,
    actions,
    mutations,
    getters
};