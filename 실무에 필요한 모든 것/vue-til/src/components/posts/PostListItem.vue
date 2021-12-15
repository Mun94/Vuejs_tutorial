<template>
  <li>
    <div>{{ postItem.title }}</div>
    <div>{{ postItem.contents }}</div>
    <div>
      {{ postItem.createdAt | formatDate }}
      <button @click="routeEditPage">수정</button>
      <button @click="deleteItem">삭제</button>
    </div>
  </li>
</template>

<script>
import { deletePost } from '@/api/posts';

export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
  filters: {
    // vue 3.x 버전에서는 filter는 삭제되었고 더 이상 지원되지 않음
    formatDate(value) {
      return new Date(value);
    },
  },
  methods: {
    async deleteItem() {
      if (confirm('you want to delete this')) {
        await deletePost(this.postItem._id);
        this.$emit('refresh');
      }
    },
    routeEditPage() {
      this.$router.push(`/post/${this.postItem._id}`);
    },
  },
};
</script>

<style></style>
