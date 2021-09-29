<template>
  <teleport to="body">
    <div
      v-if="modalOpen"
      class="modal"
    >
      <div>
        삭제 되었습니다.
        <button @click="$emit('closeModal', false)">
          닫기
        </button>
      </div>
    </div>
  </teleport>
</template>

<script lang = "ts">
const options = {
  name: 'Modal',
  emits: ['closeModal'],
  props: {
    modalOpen: {
      type: Boolean,
      required: true,
    },
  },
};

export default {
  ...options,
};
</script>

<style scoped>
    .modal {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;

        bottom: 40px;
        left: 10px;

        width: 380px;
        height: 300px;

        background: #565656;
    }
</style>
