<template>
  <CalculationScreen />
</template>

<script lang = "ts">
import CalculationScreen from '../../components/calculator/CalculationScreen.vue';

import { ICalculationScreenCon } from '../../types';

const options = {
  name: 'CalculationScreenCon',
  components: { CalculationScreen },
};

export default {
  ...options,
} as ICalculationScreenCon;

</script>
