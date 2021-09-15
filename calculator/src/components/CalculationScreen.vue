<template>
    <div class = 'screenWrap'>
        <div class = "title">계산기</div>
        <div class = "recordIcon">
            <font-awesome-icon icon="clock" class="icon alt" @click = "changeScreen"/>
        </div>
         <div class = "process">
            {{ processGet || '계산 과정'}}
        </div>
        <div class = "result">
            {{ resultGet }}
        </div>
    </div>    
</template>

<script lang = 'ts'>
    interface IMethods {
        changeScreen: () => void;
    };

    interface IComputed {
        processGet: () => void;
        resultGet: () => void;
    };

    type TThis = IMethods & IComputed & { $store: any };

    export interface ICalculationScreen {
        name: string;
        data?:() => void;
        methods: IMethods;
        computed: IComputed;
    };

    export default {
        name: 'CalculatorScreen',
        data() { return {}},
        methods: {
            changeScreen() {
                (this as TThis).$store.commit('CHANGE');
            }
        },
        computed: {
            processGet() {
                return (this as TThis).$store.getters.processVal;
            },
            resultGet() {
                return (this as TThis).$store.getters.resultVal;
            },
        }
    } as ICalculationScreen;
</script>

<style scoped>
    .screenWrap {
        width: 100%;
        height: 200px;
        background: #565656;
    }

    .title {
        text-align: left;

        color: #FFFFFF;
    }

    .recordIcon, .result, .process {
        text-align: right;

        color: #FFFFFF;
    }

    .recordIcon {
        font-size: 25px;

        cursor: pointer;
    }

    .result, .process {
        margin-top: 15px;
    }

    .result {
        font-size: 40px;
    }
</style>