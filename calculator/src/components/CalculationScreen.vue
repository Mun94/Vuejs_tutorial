<template>
    <div class = 'screenWrap'>
        <div class = "title">계산기</div>
        <div class = "recordIcon">
            <font-awesome-icon icon = "clock" class = "icon alt" @click = "changeScreen"/>
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

    interface IThis extends IMethods, IComputed {
        $store: any
    };

    export interface ICalculationScreen {
        name    : string;
        data?   : () => void;
        methods : IMethods;
        computed: IComputed;
    };

    export default {
        name: 'CalculatorScreen',
        data() { return {}},
        methods: {
            changeScreen() {
                (this as IThis).$store.commit('CHANGE');
            }
        },
        computed: {
            processGet() {
                return (this as IThis).$store.getters.processVal;
            },
            resultGet() {
                return (this as IThis).$store.getters.resultVal;
            },
        }
    } as ICalculationScreen;
</script>

<style scoped>
    .screenWrap {
        padding: 10px;
        height: 200px;

        background: #565656;
    }

    .title {
        text-align: left;

        color: #FFFFFF;
    }

    .result {
        max-height: 110px;
        word-break: break-word;

        font-size: 40px;

        overflow: auto;
    }

    .recordIcon, .result, .process {
        text-align: right;

        color: #FFFFFF;
    }

    .process {
        letter-spacing: 5px;
    }

    .recordIcon {
        font-size: 25px;

        cursor: pointer;
    }

    .result, .process {
        margin-top: 15px;
    }
</style>