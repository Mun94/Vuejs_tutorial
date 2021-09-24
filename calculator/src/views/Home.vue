<template>
  <div class="block">
    <CalculationScreen />
    <component :is="togglePad" />
  </div>
</template>

<script lang = "ts">
import {
  defineComponent, computed, ComputedRef,
} from 'vue';
import { useStore, Store } from 'vuex';
import CalculationScreen from '../components/CalculationScreen.vue';
import CalculatorPad, { ICalculatorPad } from '../components/CalculatorPad.vue';
import RecordPad, { IRecordPad } from '../components/RecordPad.vue';

import { ICalculationScreen } from '../types';

interface IHome {
  name: string;
  components: { CalculationScreen: Pick<ICalculationScreen, 'name'> },
  setup: () => {
    togglePad: ComputedRef<IRecordPad | ICalculatorPad>
  }
}

export default defineComponent({
  name: 'Home',
  components: {
    CalculationScreen,
  },
  setup() {
    const store = useStore<Store<any>>();

    const togglePad: ComputedRef<IRecordPad | ICalculatorPad> = computed(() => {
      const val = store.getters.checkVal ? RecordPad : CalculatorPad;

      return val;
    });

    return { togglePad };
  },
} as IHome);
</script>

<style scoped>
  .block {
    background: #565656;
    width: 400px;
  }
</style>>
