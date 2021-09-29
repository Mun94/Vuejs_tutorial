<template>
    <CalculatorPadCon/>
</template>

<script lang = 'ts'>
    import { reactive, toRefs, provide, readonly, ref } from 'vue';
    import CalculatorPadCon from './CalculatorPadCon.vue';

    import { IState, TCalculationActions, IMutations } from '../../types';


    const options = {
        name: 'HomeContainer',
        components: { CalculatorPadCon }
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

            const calculationActions: TCalculationActions = (payload) => {
                const { val, controller } = payload;

                switch(controller) {
                    case 'operator':
                        console.log('test');
                    default:
                        break;
                }
                // switch(controller) {
                //     case 'operator': 
                //          if (state.clickVal.slice(-1) === '.') { // '.' 다음에 바로 연산자가 오지 않게
                //             return;
                //         }

                //         const callProcess = (): void => {
                //         state.process = '';

                //         commit('PROCESS', val);
                //             state.resultVal = 0;
                //         };

                //         if (clickNum) { // 숫자 클릭 후 연산자 사용 가능, 연산자 클릭 후 또 연산자 클릭 못 하게
                //             if (clickClearEntry) { // CE 눌렀을 때
                //                 callProcess();

                //                 state.clickVal = '';

                //                 clickClearEntry = false;
                //             } else {
                //                 if (state.resultVal && !clickPlusMinus) { // 결과 값이 있으면서 '+/-'버튼을 클릭했을 때
                //                     callProcess();
                //                 } else if (state.resultVal && clickPlusMinus) { // 결과 값이 있으면서 '+/-'버튼을 클릭했을 때
                //                     callProcess();

                //                 clickPlusMinus = false;
                //             } else {
                //                     if (state.process.split('-')[0] === state.process.split('-')[1] || state.process.includes('*0')) { // 이전 계산 결과값이 0 이면
                //                         state.process = '';
                //                     }

                //                     if (state.process.includes('0*') || state.process.includes('0/')) { // 계산 결과값이 없거나 계산식에 0*, 0/ 이 있으면
                //                         state.process = '';

                //                         state.clickVal = '0';
                //                     }

                //                     if (checkInfinityAndNaN) { // 값이 무한인지 확인
                //                         state.process = '';

                //                         checkInfinityAndNaN = false;
                //                     }
                //                     commit('PROCESS', val);
                //                     state.resultVal = 0;
                //                 }

                //                 state.clickVal = '';
                //                 clickNum = false;
                //             }

                //             clickOpe = true;
                //         }
                //         break;
                //     case: 
                //     break;
                //     default:
                //     break;
                // };
            }

            const { process, resultVal } = toRefs(state);
            provide('processVal', process);
            provide('resultVal', resultVal);
            provide('recordVal', readonly(state.record));
            provide('calculationActions', calculationActions);

            return {}
        }
    };
</script>