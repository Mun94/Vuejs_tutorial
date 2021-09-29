<template>
  <CalculationScreen />
</template>

<script lang = "ts">
import CalculationScreen from '../../components/home/CalculationScreen.vue';

const options = {
  name: 'CalculationScreenCon',
  components: { CalculationScreen },
};

export default {
  ...options,
};

</script>
