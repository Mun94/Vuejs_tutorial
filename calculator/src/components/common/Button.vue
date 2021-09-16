<template>
    <button class = "button" >
        <slot></slot>
    </button>
</template>

<script lang = 'ts'>
    interface IData {
        backgroundColor: string;
    };

    interface IMethods {
        color: () => string;
    };

    interface IThis extends IMethods {
        $store: any;
        buttonType: string;
    };

    export interface IButton {
        name: string;
        props: string[];
        data?: () => IData;
        methods: IMethods;
    };

    export default {
        name: 'Button',
        props: ['buttonType'],
        data() {
            return {
                backgroundColor: (this as unknown as IThis).color()
            };
        },
        methods: {
          color() {
            return (this as IThis).buttonType === 'num' ? '#111111' : '#343434';
          }
        } 
    } as IButton;
</script>

<style scoped>
    .button {
        width : 100%;
        height: 60px;

        border: none;
        background: v-bind('backgroundColor');

        color: #FFFFFF;
        font-size: 20px;
        cursor: pointer;
    }
</style>