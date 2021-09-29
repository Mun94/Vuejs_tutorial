<template>

  <div class="home">

    <HomeContainer />

  </div>

</template>



<script lang="ts">

import { defineComponent } from 'vue';

import HomeContainer from '../containers/home/HomeContainer.vue';



export default defineComponent({

  name: 'Home',

  components: {

    HomeContainer,

  },

});

</script>



<style scoped>

  .home {

    background: #565656;

    width: 400px;

  }

</style>>
