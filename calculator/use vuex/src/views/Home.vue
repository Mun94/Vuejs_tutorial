<template>
  <div class="block">
    <CalculationScreen />
    <component :is="togglePad" />
  </div>
</template>

<script lang = "ts">
import {
  defineComponent, computed,
} from 'vue';
import { useStore } from 'vuex';
import CalculationScreen from '../components/CalculationScreen.vue';
import CalculatorPad from '../components/CalculatorPad.vue';
import RecordPad from '../components/RecordPad.vue';

import { TStore, TTogglePad, IHome } from '../types';

export default defineComponent({
  name: 'Home',
  components: {
    CalculationScreen,
  },
  setup() {
    const store: TStore = useStore();

    const togglePad: TTogglePad = computed(() => {
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
</style>
