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
  name: 'CalculatorContainer',
  components: { CalculatorPadCon, CalculationScreenCon },
};

export default {
  ...options,
  setup() {
    const calculationState: Omit<IState, 'check'> = reactive({
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

    const changeComponentState: Pick<IState, 'check'> = reactive({
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
    } = calculationState.clickStatus;

    const calculationMutations: Omit<IMutations, 'CHANGE'> = {
      PROCESS: (payload) => {
        calculationState.process += calculationState.clickVal + payload;

        return calculationState.process;
      },
      CLICK_VAL: (payload) => {
        calculationState.clickVal += payload;

        return calculationState.clickVal;
      },
      RESULT_AND_RECORD: (payload) => {
        const editResultRecord = (result) => {
          calculationState.resultVal = eval(result);
          calculationState.record = calculationState.record.concat({
            process: calculationState.process = result,
            result: calculationState.resultVal,
          } as IResult);
        };

        switch (payload) {
          case 'addClickValFirst': {
            const addClickValFirst = `${calculationState.clickVal}${calculationState.process}`;

            editResultRecord(addClickValFirst);
            break;
          } case 'addZeroFirst': {
            const addZeroFirst = `0+${calculationState.process}${calculationState.clickVal}`;

            editResultRecord(addZeroFirst);
            break;
          } case 'addProcessFirst': {
            clickCENumAfterOpe = false;

            const addProcessFirst = `${calculationState.process}${calculationState.clickVal}`;

            editResultRecord(addProcessFirst);
            break;
          } default: // 숫자만 클릭
            editResultRecord(calculationState.process);
            break;
        }

        if (!Number.isFinite(calculationState.resultVal)) { // 결과 값이 무한인지 확인
          checkInfinityAndNaN = true;

          calculationState.resultVal = 0;
        }
      },
      CLEAR: () => {
        calculationState.clickVal = '';
        calculationState.process = '';
        calculationState.resultVal = 0;

        clickNum = false;
      },
      CLEAR_ENTRY: () => {
        let filterVal = true;

        if (!checkCE) { // CE가 여러번 눌리지 않게
          checkCE = true;
          const arr: TArr = calculationState.process.split('').reverse().map((val: string, i: number): TCurrentVal => {
            if (Number.isNaN(Number(val)) && i !== 0) {
              filterVal = false;
            }

            return { val, filterVal };
          });

          calculationState.process = arr.reduce((be: string[], cur: TCurrentVal, i: number): string[] => (cur.filterVal || (arr[i - 1].filterVal || arr[i - 1].val === '.')
            ? be.concat(cur.val) : be.concat('')),
          []).reverse().join(''); // 가장 최근 입력한 값만 남기고 모두 삭제

          return calculationState.process;
        }

        return '';
      },
      REMOVE_ALL_RECORD: () => {
        calculationState.record = [];

        return [];
      },
    };
    const changeComponentMutaions: Pick<IMutations, 'CHANGE'> = {
      CHANGE: () => {
        changeComponentState.check = !changeComponentState.check;

        return changeComponentState.check;
      },
    };

    const calculationActions: TCalculationActions = (payload) => {
      const { val, controller } = payload;

      switch (controller) {
        case 'operator': {
          if (calculationState.clickVal.slice(-1) === '.') { // '.' 다음에 바로 연산자가 오지 않게
            return;
          }

          const callProcess = (): void => {
            calculationState.process = '';

            calculationMutations.PROCESS(val);
            calculationState.resultVal = 0;
          };

          if (clickNum) { // 숫자 클릭 후 연산자 사용 가능, 연산자 클릭 후 또 연산자 클릭 못 하게
            if (clickClearEntry) { // CE 눌렀을 때
              callProcess();

              calculationState.clickVal = '';

              clickClearEntry = false;
            } else {
              if (calculationState.resultVal && !clickPlusMinus) { // 결과 값이 있으면서 '+/-'버튼을 클릭했을 때
                callProcess();
              } else if (calculationState.resultVal && clickPlusMinus) {
                // 결과 값이 있으면서 '+/-'버튼을 클릭했을 때
                callProcess();

                clickPlusMinus = false;
              } else {
                if (calculationState.process.split('-')[0] === calculationState.process.split('-')[1] || calculationState.process.includes('*0')) { // 이전 계산 결과값이 0 이면
                  calculationState.process = '';
                }

                if (calculationState.process.includes('0*') || calculationState.process.includes('0/')) { // 계산 결과값이 없거나 계산식에 0*, 0/ 이 있으면
                  calculationState.process = '';

                  calculationState.clickVal = '0';
                }

                if (checkInfinityAndNaN) { // 값이 무한인지 확인
                  calculationState.process = '';

                  checkInfinityAndNaN = false;
                }

                calculationMutations.PROCESS(val);
                calculationState.resultVal = 0;
              }

              calculationState.clickVal = '';
              clickNum = false;
            }

            clickOpe = true;
          }
          break;
        } case 'number':
          if (val === '.' && (calculationState.clickVal.includes('.') && !clickEnter)) {
            return;
          } // '.' 을 여러번 클릭해도 한번만 입력 되게

          if (calculationState.clickVal.slice(0, 1) === '0') {
            calculationState.clickVal = '';
          } // 첫 자리 수가 0 일때 0이 여러번 클릭 되지 않게

          if (clickEnter) {
            calculationState.clickVal = '';

            clickEnter = false;
          }

          if (clickClearEntry) { // 다음 숫자 누르기 이전에 숫자, 연산자 클릭 후 ce 버튼을 눌렀을 때
            if (Number(calculationState.process.slice(0, 1))) {
              clickCENumAfterOpe = true;
            }
          }

          if (checkInfinityAndNaN) { // 이전 계산 값이 무한이면
            calculationState.process = '';
            checkInfinityAndNaN = false;
          }

          clickNum = true;
          calculationMutations.CLICK_VAL(val);
          break;
        case 'plusMinus': {
          if (calculationState.clickVal.includes('-')) { // '+ / -' 변환
            calculationState.clickVal = calculationState.clickVal.slice(1);
            calculationState.resultVal = Math.abs(calculationState.resultVal);
            clickPlusMinus = false;
          } else {
            calculationState.clickVal = `-${calculationState.clickVal}`;
            clickPlusMinus = true;
          }
          break;
        }
        case 'enter': {
          checkCE = false;

          const callResultRecord: TCallResultRecord = (recordOpt) => {
            if (recordOpt) {
              calculationMutations.RESULT_AND_RECORD(recordOpt);
            } else {
              calculationMutations.RESULT_AND_RECORD();
            }
          };

          if (clickClearEntry) { // CE를 누른 상태
            if (clickCENumAfterOpe) { // 숫자 클릭 -> 연산자 -> CE -> 숫자 -> 엔터
              callResultRecord('addProcessFirst');
            } else if (!calculationState.process) { // 숫자 클릭 -> CE -> 숫자 -> 엔터
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
              calculationState.process = `${calculationState.resultVal} + ${Number(calculationState.clickVal)}`;
              callResultRecord();

              clickEnter = true;
            }
          }
          calculationState.clickVal = `${calculationState.resultVal}`;
          break;
        } case 'backspace': {
          if (clickNum && !clickEnter) {
            // 숫자를 누르고 엔터 키를 누르지 않았을 때 (숫자 키를 누르면 clickEnter 초기화 됨 이렇게 안 하면 계산된 값이 지워질 수 있음)
            calculationState.clickVal = calculationState.clickVal.slice(0, -1);
          }
          break;
        } case 'clear': {
          calculationMutations.CLEAR(); // 초기화
          break;
        } case 'clearEntry': {
          clickClearEntry = true;

          if (checkInfinityAndNaN) { // 값이 무한인지 확인
            calculationState.process = '';

            checkInfinityAndNaN = false;
          }

          if (calculationState.clickVal && !clickEnter) {
            calculationState.clickVal = '';
          } else {
            calculationMutations.CLEAR_ENTRY();
          }

          break;
        }
        default:
          break;
      }
    };

    const togglePad = computed(() => {
      const val = changeComponentState.check ? RecordPadCon : CalculatorPadCon;

      return val;
    });

    const { process, clickVal, record } = toRefs(calculationState);
    provide('processVal', readonly(process));
    provide('resultVal', readonly(clickVal));
    provide('recordVal', readonly(record));
    provide('removeAllRecord', calculationMutations.REMOVE_ALL_RECORD);
    provide('calculationActions', calculationActions);

    provide('changeComponent', changeComponentMutaions.CHANGE);

    return { togglePad };
  },
};
</script>
