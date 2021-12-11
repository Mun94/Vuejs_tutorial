<template>
  <li>
    <div>{{ postItem.title }}</div>
    <div>{{ postItem.contents }}</div>
    <div>
      {{ postItem.createdAt }}
      <button>수정</button>
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
  methods: {
    async deleteItem() {
      if (confirm('you want to delete this')) {
        await deletePost(this.postItem._id);
        this.$emit('refresh');
      }
    },
  },
};
</script>

<style></style>
