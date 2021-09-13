<template>
    <div class = "recordPadWrap">
        {{ test }}
    </div>
</template>

<script lang = "ts">
    export default {
        name: 'RecordPad',
        data() { return {
            test: this.$store.getters.recordVal
        }}
    }
</script>

<style scoped>
    .recordPadWrap {
        width:100%;
        height: 374px;

        background: #272727;
    }
</style>