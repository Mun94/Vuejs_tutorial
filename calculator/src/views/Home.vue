<template>
  <div class="home">
    <HomeCom msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeCom from '../components/HomeCom.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HomeCom,
  },
});
</script>
