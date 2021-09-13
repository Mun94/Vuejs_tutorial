<template>
    <div class = 'screenWrap'>
        <div class = "title">계산기</div>
        <div class = "recordIcon">
            <font-awesome-icon icon="user-secret" />
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
    export default {
        name: 'CalculatorScreen',
        data() { return {}},
        computed: {
            processGet() {
                return this.$store.getters.processVal
            },
            resultGet() {
                return this.$store.getters.resultVal
            }
        }
    }
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
    }

    .result, .process {
        margin-top: 15px;
    }

    .result {
        font-size: 40px;
    }
</style>