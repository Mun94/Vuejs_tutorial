<template>
    <div class = "CalculatorPadWrap">
        <table class = "tableWrap">
            <tr>
                <td><Button></Button></td>
                <td><Button>CE</Button></td>
                <td><Button>C</Button></td>
                <td><Button><font-awesome-icon icon="user-secret" /></Button></td>
            </tr>
            <tr>
                <td><Button></Button></td>
                <td><Button></Button></td>
                <td><Button></Button></td>
                <td><Button>/</Button></td>
            </tr>
            <tr>
                <td><Button valType = "num" @click = "clickEvent('7', 'number')">7</Button></td>
                <td><Button valType = "num" @click = "clickEvent('8', 'number')">8</Button></td>
                <td><Button valType = "num" @click = "clickEvent('9', 'number')">9</Button></td>
                <td><Button @click = "clickEvent('*', 'operator')">*</Button></td>
            </tr>
            <tr>
                <td><Button valType = "num" @click = "clickEvent('4', 'number')">4</Button></td>
                <td><Button valType = "num" @click = "clickEvent('5', 'number')">5</Button></td>
                <td><Button valType = "num" @click = "clickEvent('6', 'number')">6</Button></td>
                <td><Button @click = "clickEvent('-', 'operator')">-</Button></td>
            </tr>
            <tr>
                <td><Button valType = "num" @click = "clickEvent('1', 'number')">1</Button></td>
                <td><Button valType = "num" @click = "clickEvent('2', 'number')">2</Button></td>
                <td><Button valType = "num" @click = "clickEvent('3', 'number')">3</Button></td>
                <td><Button @click = "clickEvent('+', 'operator')">+</Button></td>
            </tr>
            <tr>
                <td><Button valType = "num">+/-</Button></td>
                <td><Button valType = "num" @click = "clickEvent('0', 'number')">0</Button></td>
                <td><Button valType = "num">.</Button></td>
                <td><Button @click = "clickEvent('+', 'equals')">=</Button></td>
            </tr>
        </table>
    </div>
</template>

<script lang = "ts">
    import Button from './common/Button.vue';

    export default {
         name: 'CalculatorPad',
        data() {
            return {}
        },
        methods: {
            clickEvent(val: string, symbol: string): void {
                this.$store.dispatch('cal', {val, symbol})
            }
        },
        components: { Button }
    }
</script>

<style scoped>
    .calculatorPadWrap {
        width: 500px;
    }

    .tableWrap {
        width: 100%;
        border-collapse: collapse; 
        border-spacing: 0;
    }
</style>