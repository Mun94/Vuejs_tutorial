<template>
  <div class = 'block'>
    <CalculationScreen/>
    <CalculatorPad/>
  </div>
</template>

<script lang = 'ts'>
  import { defineComponent } from 'vue';
  import CalculatorPad from '../components/CalculatorPad.vue';
  import CalculationScreen from '../components/CalculationScreen.vue';

  export default defineComponent({
    name: 'Home',
    components: {
      CalculatorPad,
      CalculationScreen
    },
  });
</script>

<style scoped>
  .block {
    background: #000000;
  }
</style>>
