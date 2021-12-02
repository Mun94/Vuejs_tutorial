<template>
  <li>
    <div>{{ postItem.title }}</div>
    <div>{{ postItem.contents }}</div>
    <div>{{ postItem.createdAt }}</div>
  </li>
</template>

<script>
export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
