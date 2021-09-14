<template>
    <button class = "button" >
        <slot></slot>
    </button>
</template>

<script lang = "ts">
    interface IData {
        backgroundColor: string;
    };

    interface IMethods {
        color: () => string;
    };

    type TThis = IMethods & { $store: any, valType: string };

    export interface IButton {
        name: string;
        props: string[];
        data?: () => IData;
        methods: IMethods;
    };

    export default {
        name: 'Button',
        props: ['valType'],
        data() {
            return {
                backgroundColor: (this as unknown as TThis).color()
            };
        },
        methods: {
          color() {
            return (this as TThis).valType === 'num' ? '#111111' : '#343434';
          }
        } 
    } as IButton;
</script>

<style scoped>
    .button {
        width : 100%;
        height: 60px;

        background: v-bind('backgroundColor');

        color: #FFFFFF;
        font-size: 20px;
        cursor: pointer;
    }
</style>