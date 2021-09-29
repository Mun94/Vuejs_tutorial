<template>
    <CalculatorPad :calculatorPadVals = "calculatorPadVals"/>
</template>

<script lang = 'ts'>
    import CalculatorPad from '../../components/home/CalculatorPad.vue';
    import { TCalculatorPadVals, ICalculatorPad, TClickEvent } from '../../types';

    const options = {
        name: 'CalculatorPadCon',
        components: { CalculatorPad }
    };

    export default {
        ...options,
        setup() {
            const calculatorPadVals: TCalculatorPadVals = [
                [
                    { value: '', type: '' },
                    { value: '', type: 'clearEntry', otherVal: 'CE' },
                    { value: '', type: 'clear', otherVal: 'C' },
                    { value: '', type: 'backspace', otherVal: 'icon' },
                ],
                [
                    { value: '', type: '' },
                    { value: '', type: '' },
                    { value: '', type: '' },
                    { value: '/', type: 'operator' },
                ],
                [
                    { value: '7', type: 'number' },
                    { value: '8', type: 'number' },
                    { value: '9', type: 'number' },
                    { value: '*', type: 'operator' },
                ],
                [
                    { value: '4', type: 'number' },
                    { value: '5', type: 'number' },
                    { value: '6', type: 'number' },
                    { value: '-', type: 'operator' },
                ],
                [
                    { value: '1', type: 'number' },
                    { value: '2', type: 'number' },
                    { value: '3', type: 'number' },
                    { value: '+', type: 'operator' },
                ],
                [
                    { value: '', type: 'plusMinus', otherVal: '+/-' },
                    { value: '0', type: 'number' },
                    { value: '.', type: 'number' },
                    { value: '', type: 'enter', otherVal: '=' },
                ],
            ];

            return { calculatorPadVals }
        }
    }
    // as ICalculatorPad;
</script>