<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang = 'ts'>
import {
  computed,
} from 'vue';
import {
  IData, IButton, TBackgroundColor,
} from '../../types';

const options = {
  name: 'Button',
  props: {
    buttonType: {
      type: String,
    },
  },
};

export default {
  ...options,
  setup(props: IData) {
    const { buttonType } = props;

    const color = {
      black: '#111111',
      gray: '#343434',
    };

    const backgroundColor: TBackgroundColor = computed(() => {
      const val = ['number', 'plusMinus'].includes(buttonType) ? color.black : color.gray;

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
