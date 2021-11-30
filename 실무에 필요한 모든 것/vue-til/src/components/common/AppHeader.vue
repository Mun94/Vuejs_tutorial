<template>
  <header>
    <template v-if="isUserLogin">
      <span>{{ $store.state.username }}</span>
    </template>
    <template v-else>
      <router-link to="/login">로그인</router-link> |
      <router-link to="/signup">회원가입</router-link>
    </template>
  </header>
</template>

<script>
export default {
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style></style>
