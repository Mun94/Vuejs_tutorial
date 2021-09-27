<template>
    <Test v-bind:msg = "testprops" v-on:test-func = "testFunc"/>
</template>

<script>
    export default {
        name: 'TestM'
    }
</script>

<script setup>
    import { ref, Ref } from 'vue';
    import Test from './Test.vue';

    const testprops = ref(0);

    const testFunc = () => ++testprops.value
</script>