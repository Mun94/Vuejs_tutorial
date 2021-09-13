<template>
  <div class = 'block'>
    <CalculationScreen/>
    <component :is = "changeComponent"/>
  </div>
</template>

<script lang = "ts">
  import { defineComponent } from 'vue';
  import CalculatorPad from '../components/CalculatorPad.vue';
  import CalculationScreen from '../components/CalculationScreen.vue';
  import RecordPad from '../components/RecordPad.vue';

  export default defineComponent({
    name: 'Home',
    computed: {
      changeComponent() {
        return this.$store.getters.checkVal ?  RecordPad : CalculatorPad
      }
    },
    components: {
      CalculationScreen,
    },
  });
</script>

<style scoped>
  .block {
    background: #000000;
    width: 400px;
  }
</style>>
