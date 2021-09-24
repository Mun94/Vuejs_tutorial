<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang = 'ts'>
import {
  computed, toRefs,
} from 'vue';
import {
  IData, IButton, IToRefs, TBackgroundColor,
} from '../../types';

export default {
  name: 'Button',
  props: {
    buttonType: {
      type: String,
    },
  },
  setup(props: IData) {
    const { buttonType }: IToRefs = toRefs(props);

    const backgroundColor: TBackgroundColor = computed(() => {
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
