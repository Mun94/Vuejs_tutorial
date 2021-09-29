<template>
  <div>
    <CalculationScreenCon />
    <component :is="togglePad" />
  </div>
</template>

<script lang = 'ts'>
import {
  reactive, toRefs, provide, readonly, computed,
} from 'vue';
import CalculatorPadCon from './CalculatorPadCon.vue';
import CalculationScreenCon from './CalculationScreenCon.vue';
import RecordPadCon from './RecordPadCon.vue';

import {
  IState, IMutations, TCalculationActions, IResult, TArr, TCurrentVal, TCallResultRecord,
} from '../../types';

const options = {
  name: 'HomeContainer',
  components: { CalculatorPadCon, CalculationScreenCon },
};

export default {
  ...options,
  setup() {
    const state: Omit<IState, 'check'> = reactive({
      clickVal: '',
      process: '',

      resultVal: 0,

      record: [],

      clickStatus: {
        clickNum: false,
        clickOpe: false,
        clickEnter: false,
        clickPlusMinus: false,
        clickClearEntry: false,
        clickCENumAfterOpe: false,

        checkCE: false,
        checkInfinityAndNaN: false,
      },
    });

    const changeScreenState: Pick<IState, 'check'> = reactive({
      check: false,
    });

    let {
      clickNum,
      clickOpe,
      clickEnter,
      clickPlusMinus,
      clickClearEntry,
      clickCENumAfterOpe,
      checkCE,
      checkInfinityAndNaN,
    } = state.clickStatus;

    const mutations: Omit<IMutations, 'CHANGE'> = {
      PROCESS: (payload) => {
        state.process += state.clickVal + payload;

        return state.process;
      },
      CLICK_VAL: (payload) => {
        state.clickVal += payload;

        return state.clickVal;
      },
      RESULT_AND_RECORD: (payload) => {
        switch (payload) {
          case 'addClickValFirst': {
            const sum = `${state.clickVal}${state.process}`;

            state.resultVal = eval(sum);
            state.record = state.record.concat({
              process: state.process = sum,
              result: state.resultVal,
            } as IResult);
            break;
          } case 'addZeroFirst': {
            const sum2 = `0+${state.process}${state.clickVal}`;

            state.resultVal = eval(sum2);
            state.record = state.record.concat({
              process: state.process = sum2,
              result: state.resultVal,
            } as IResult);
            break;
          } case 'addProcessFirst': {
            clickCENumAfterOpe = false;

            const sum3 = `${state.process}${state.clickVal}`;
            state.resultVal = eval(sum3);
            state.record = state.record.concat({
              process: state.process = sum3,
              result: state.resultVal,
            } as IResult);
            break;
          } default: // 숫자만 클릭
            state.resultVal = eval(state.process);
            state.record = state.record.concat({
              process: state.process,
              result: state.resultVal,
            } as IResult);
            break;
        }

        if (!Number.isFinite(state.resultVal)) { // 결과 값이 무한인지 확인
          checkInfinityAndNaN = true;

          state.resultVal = 0;
        }
      },
      CLEAR: () => {
        state.clickVal = '';
        state.process = '';
        state.resultVal = 0;

        clickNum = false;
      },
      CLEAR_ENTRY: () => {
        let filterVal = true;

        if (!checkCE) { // CE가 여러번 눌리지 않게
          checkCE = true;
          const arr: TArr = state.process.split('').reverse().map((val: string, i: number): TCurrentVal => {
            if (Number.isNaN(Number(val)) && i !== 0) {
              filterVal = false;
            }

            return { val, filterVal };
          });

          state.process = arr.reduce((be: string[], cur: TCurrentVal, i: number): string[] => (cur.filterVal || (arr[i - 1].filterVal || arr[i - 1].val === '.')
            ? be.concat(cur.val) : be.concat('')),
          []).reverse().join(''); // 가장 최근 입력한 값만 남기고 모두 삭제

          return state.process;
        }

        state.clickVal = '';

        return state.clickVal;
      },
      REMOVE_ALL_RECORD: () => {
        state.record = [];

        return [];
      },
    };
    const changeScreenMutaions: Pick<IMutations, 'CHANGE'> = {
      CHANGE: () => {
        changeScreenState.check = !changeScreenState.check;

        return changeScreenState.check;
      },
    };

    const calculationActions: TCalculationActions = (payload) => {
      const { val, controller } = payload;

      switch (controller) {
        case 'operator': {
          if (state.clickVal.slice(-1) === '.') { // '.' 다음에 바로 연산자가 오지 않게
            return;
          }

          const callProcess = (): void => {
            state.process = '';

            mutations.PROCESS(val);
            state.resultVal = 0;
          };

          if (clickNum) { // 숫자 클릭 후 연산자 사용 가능, 연산자 클릭 후 또 연산자 클릭 못 하게
            if (clickClearEntry) { // CE 눌렀을 때
              callProcess();

              state.clickVal = '';

              clickClearEntry = false;
            } else {
              if (state.resultVal && !clickPlusMinus) { // 결과 값이 있으면서 '+/-'버튼을 클릭했을 때
                callProcess();
              } else if (state.resultVal && clickPlusMinus) { // 결과 값이 있으면서 '+/-'버튼을 클릭했을 때
                callProcess();

                clickPlusMinus = false;
              } else {
                if (state.process.split('-')[0] === state.process.split('-')[1] || state.process.includes('*0')) { // 이전 계산 결과값이 0 이면
                  state.process = '';
                }

                if (state.process.includes('0*') || state.process.includes('0/')) { // 계산 결과값이 없거나 계산식에 0*, 0/ 이 있으면
                  state.process = '';

                  state.clickVal = '0';
                }

                if (checkInfinityAndNaN) { // 값이 무한인지 확인
                  state.process = '';

                  checkInfinityAndNaN = false;
                }

                mutations.PROCESS(val);
                state.resultVal = 0;
              }

              state.clickVal = '';
              clickNum = false;
            }

            clickOpe = true;
          }
          break;
        } case 'number':
          if (val === '.' && (state.clickVal.includes('.') && !clickEnter)) {
            return;
          } // '.' 을 여러번 클릭해도 한번만 입력 되게

          if (state.clickVal.slice(0, 1) === '0') {
            state.clickVal = '';
          } // 첫 자리 수가 0 일때 0이 여러번 클릭 되지 않게

          if (clickEnter) {
            state.clickVal = '';

            clickEnter = false;
          }

          if (clickClearEntry) { // 다음 숫자 누르기 이전에 숫자, 연산자 클릭 후 ce 버튼을 눌렀을 때
            if (Number(state.process.slice(0, 1))) {
              clickCENumAfterOpe = true;
            }
          }

          if (checkInfinityAndNaN) { // 이전 계산 값이 무한이면
            state.process = '';
            checkInfinityAndNaN = false;
          }

          clickNum = true;
          mutations.CLICK_VAL(val);
          break;
        case 'plusMinus': {
          if (state.clickVal.includes('-')) { // '+ / -' 변환
            state.clickVal = state.clickVal.slice(1);
            state.resultVal = Math.abs(state.resultVal);
            clickPlusMinus = false;
          } else {
            state.clickVal = `-${state.clickVal}`;
            clickPlusMinus = true;
          }
          break;
        }
        case 'enter': {
          checkCE = false;

          const callResultRecord: TCallResultRecord = (recordOpt) => {
            if (recordOpt) {
              mutations.RESULT_AND_RECORD(recordOpt);
            } else {
              mutations.RESULT_AND_RECORD();
            }
          };

          if (clickClearEntry) { // CE를 누른 상태
            if (clickCENumAfterOpe) { // 숫자 클릭 -> 연산자 -> CE -> 숫자 -> 엔터
              callResultRecord('addProcessFirst');
            } else if (!state.process) { // 숫자 클릭 -> CE -> 숫자 -> 엔터
              callResultRecord('addZeroFirst');
            } else { // 숫자 클릭 -> 연산자 -> 숫자 -> 엔터 -> CE -> 숫자 -> 엔터
              callResultRecord('addClickValFirst');
            }

            clickClearEntry = false;
            clickEnter = true;
            clickOpe = false;
          } else {
            if (clickNum && clickOpe) { // 숫자 클릭 -> 연산자 -> 숫자 클릭 -> 엔터
              callResultRecord('addProcessFirst');

              clickEnter = true;
              clickOpe = false;
            }

            if (clickNum && !clickEnter && !clickOpe) { // 숫자만 클릭 -> 엔터
              state.process = `${state.resultVal} + ${Number(state.clickVal)}`;
              callResultRecord();

              clickEnter = true;
            }
          }
          state.clickVal = `${state.resultVal}`;
          break;
        } case 'backspace': {
          if (clickNum && !clickEnter) {
            // 숫자를 누르고 엔터 키를 누르지 않았을 때 (숫자 키를 누르면 clickEnter 초기화 됨 이렇게 안 하면 계산된 값이 지워질 수 있음)
            state.clickVal = state.clickVal.slice(0, -1);
          }
          break;
        } case 'clear': {
          mutations.CLEAR(); // 초기화
          break;
        } case 'clearEntry': {
          clickClearEntry = true;
          state.clickVal = '';

          mutations.CLEAR_ENTRY();
          break;
        }
        default:
          break;
      }
    };
    const togglePad = computed(() => {
      const val = changeScreenState.check ? RecordPadCon : CalculatorPadCon;

      return val;
    });

    const { process, clickVal, record } = toRefs(state);
    provide('processVal', readonly(process));
    provide('resultVal', readonly(clickVal));
    provide('recordVal', readonly(record));
    provide('removeAllRecord', mutations.REMOVE_ALL_RECORD);
    provide('calculationActions', calculationActions);

    // const { check } = toRefs(changeScreenState);
    // provide('changeScreenState', readonly(check));
    provide('changeScreen', changeScreenMutaions.CHANGE);

    return { togglePad };
  },
};
</script>
