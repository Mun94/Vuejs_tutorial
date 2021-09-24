<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang = 'ts'>
/* eslint-disable no-unused-vars */
import {
  computed, ComputedRef, toRefs, ToRefs,
} from 'vue';

interface IData {
    [key: string]: unknown
}

export interface IButton {
        name: string;
        props: { [key: string]: { [key: string]: any} };
        setup: (props: IData) => { backgroundColor: ComputedRef<string> }
    }

export default {
  name: 'Button',
  props: {
    buttonType: {
      type: String,
    },
  },
  setup(props: IData) {
    const { buttonType } = toRefs<ToRefs<any>>(props);

    const backgroundColor: ComputedRef<string> = computed(() => {
      const val = ['number', 'plusMinus'].includes(buttonType.value) ? '#111111' : '#343434';

      return val;
    });

    return { backgroundColor };
  },
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
