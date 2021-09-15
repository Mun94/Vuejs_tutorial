<template>
    <div class = "CalculatorPadWrap">
        <table class = "tableWrap">
            <tr>
                <td><Button disabled></Button></td>
                <td><Button @click = "clickEvent('', 'clearEntry')">CE</Button></td>
                <td><Button @click = "clickEvent('', 'clear')">C</Button></td>
                <td><Button @click = "clickEvent('', 'backspace')"><font-awesome-icon icon = "backspace" class="icon alt"/></Button></td>
            </tr>
            <tr>
                <td><Button disabled></Button></td>
                <td><Button disabled></Button></td>
                <td><Button disabled></Button></td>
                <td><Button @click = "clickEvent('/', 'operator')">/</Button></td>
            </tr>
            <tr>
                <td><Button @click = "clickEvent('7', 'number')" valType = "num">7</Button></td>
                <td><Button @click = "clickEvent('8', 'number')" valType = "num">8</Button></td>
                <td><Button @click = "clickEvent('9', 'number')" valType = "num">9</Button></td>
                <td><Button @click = "clickEvent('*', 'operator')">*</Button></td>
            </tr>
            <tr>
                <td><Button @click = "clickEvent('4', 'number')" valType = "num">4</Button></td>
                <td><Button @click = "clickEvent('5', 'number')" valType = "num">5</Button></td>
                <td><Button @click = "clickEvent('6', 'number')" valType = "num">6</Button></td>
                <td><Button @click = "clickEvent('-', 'operator')">-</Button></td>
            </tr>
            <tr>
                <td><Button @click = "clickEvent('1', 'number')" valType = "num">1</Button></td>
                <td><Button @click = "clickEvent('2', 'number')" valType = "num">2</Button></td>
                <td><Button @click = "clickEvent('3', 'number')" valType = "num">3</Button></td>
                <td><Button @click = "clickEvent('+', 'operator')">+</Button></td>
            </tr>
            <tr>
                <td><Button @click = "clickEvent('', 'plusMinus')" valType = "num">+/-</Button></td>
                <td><Button @click = "clickEvent('0', 'number')"   valType = "num">0</Button></td>
                <td><Button @click = "clickEvent('.', 'number')"   valType = "num">.</Button></td>
                <td><Button @click = "clickEvent('', 'equals')">=</Button></td>
            </tr>
        </table>
    </div>
</template>

<script lang = "ts">
    import Button, { IButton } from './common/Button.vue';
 
    interface IMethods {
        clickEvent: (val: string, symbol: string) => void;
    };

    type TThis = {
        $store: any;
    };

    interface ICalculatorPad {
        name: string;
        data?: () => void;
        methods: IMethods;
        components: { Button: Pick<IButton, 'name'> };
    };

    export default {
        name: 'CalculatorPad',
        data() { return {} },
        methods: {
            clickEvent(val, symbol) {
                return (this as unknown as TThis).$store.dispatch('cal', {val, symbol});
            },
        },
        components: { 
            Button 
        }
    } as ICalculatorPad;
</script>

<style scoped>
    .calculatorPadWrap {
        width: 500px;
        height: 100%;
    }

    .tableWrap {
        width: 100%;
        height: 100%;
        border-collapse: collapse; 
        border-spacing: 0;
    }

    td {
        width: 100%;
        height: 60px;
    }

    tr {
        display: flex;
        flex-direction: row;
        flex: 1;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
</style>