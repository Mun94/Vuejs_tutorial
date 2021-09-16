<template>
  <div class = 'block'>
    <CalculationScreen/>
    <component :is = "changeComponent"/>
  </div>
</template>

<script lang = "ts">
  import { defineComponent } from 'vue';
  import CalculatorPad from '../components/CalculatorPad.vue';
  import CalculationScreen, { ICalculationScreen } from '../components/CalculationScreen.vue';
  import RecordPad from '../components/RecordPad.vue';

  interface IThis {
    $store: any
  };

  export default defineComponent({
    name: 'Home',
    computed: {
      changeComponent() {
        return (this as unknown as IThis).$store.getters.checkVal ?  RecordPad : CalculatorPad
      }
    },
    components: {
      CalculationScreen,
    } as {CalculationScreen: Pick<ICalculationScreen, 'name'>},
  });
</script>

<style scoped>
  .block {
    background: #565656;
    width: 400px;
  }
</style>>