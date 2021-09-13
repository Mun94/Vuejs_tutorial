<template>
    <button class = "button" >
        <slot></slot>
    </button>
</template>

<script lang = "ts">
    export default {
        name: 'Button',
        props: ['valType'],
        data() {
            return {
                backgroundColor: this.color()
            };
        },
        methods: {
            color():string {
                return this.valType === 'num' ? '#111111' : '#343434';
            }
        }
    };
</script>

<style scoped>
    .button {
        width : 100%;
        height: 60px;

        /* border: none; */
        background: v-bind('backgroundColor');

        color: #FFFFFF;
        font-size: 20px;
        cursor: pointer;
    }
</style>