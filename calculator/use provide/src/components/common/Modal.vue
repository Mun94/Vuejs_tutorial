<template>
  <teleport to="body">
    <div
      v-if="modalOpen"
      class="modal"
    >
      <div>
        삭제 되었습니다.
        <button @click="closeModal(false)">
          닫기
        </button>
      </div>
    </div>
  </teleport>
</template>

<script lang = "ts">
import { inject } from 'vue';

import { IModal } from '../../types';

const options = {
  name: 'Modal',
};

export default {
  ...options,
  setup() {
    const modalOpen = inject('modalOpen');
    const closeModal = inject('closeModal');

    return { modalOpen, closeModal };
  },
} as IModal;
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
