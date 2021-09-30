<template>
  <teleport to="body">
    <div
      v-if="modalOpen"
      class="modal"
    >
      <div>
        삭제 되었습니다.
        <button @click="$emit('toggleModal', false)">
          닫기
        </button>
      </div>
    </div>
  </teleport>
</template>

<script lang = 'ts'>
import { IModal } from '../../types';

const options = {
  name: 'Modal',
  props: {
    modalOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['toggleModal'],
};

export default {
  ...options,
} as IModal;
</script>

<style scoped>
    .modal {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;

        bottom: 70px;
        left: 30px;

        width: 400px;
        height: 300px;

        background: #565656;
    }
</style>
