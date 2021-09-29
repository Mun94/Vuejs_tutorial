<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang = 'ts'>
import { computed } from 'vue';
import { IProps, IButton, TBackgroundColor } from '../../types';

const options = {
  name: 'Button',
  props: {
    buttonType: {
      type: String,
      default: '',
    },
  },
};

export default {
  ...options,
  setup(props: IProps) {
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
