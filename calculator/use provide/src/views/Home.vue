<template>
  <div class="home">
    <CalculatorContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalculatorContainer from '../containers/calculator/index.vue';

export default defineComponent({
  name: 'Home',
  components: {
    CalculatorContainer,
  },
} as any);
</script>

<style scoped>
  .home {
    background: #565656;
    width: 400px;
  }
</style>
