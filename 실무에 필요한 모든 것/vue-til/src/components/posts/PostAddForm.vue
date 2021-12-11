<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="title">Title:</label>
      <input id="title" type="text" v-model="title" />
    </div>
    <div>
      <label for="contents">Content:</label>
      <textarea id="contents" type="text" v-model="contents" />
    </div>
    <button type="submit">Create</button>
  </form>
</template>

<script>
import { createPost } from '@/api/posts';

export default {
  data() {
    return {
      title: '',
      contents: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await createPost({
          title: this.title,
          contents: this.contents,
        });
        this.$router.push('/main');
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
