<template>
  <CalculationScreen />
</template>

<script lang = "ts">
import CalculationScreen from '../../components/calculator/CalculationScreen.vue';

const options = {
  name: 'CalculationScreenCon',
  components: { CalculationScreen },
};

export default {
  ...options,
};

</script>
