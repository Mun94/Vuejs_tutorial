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

export default {
  name: 'Button',
  props: {
    buttonType: {
      type: String,
    },
  },
  setup(props: IData) {
    const { buttonType } = props;

    const backgroundColor: TBackgroundColor = computed(() => {
      const val = ['number', 'plusMinus'].includes(buttonType) ? '#111111' : '#343434';

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
