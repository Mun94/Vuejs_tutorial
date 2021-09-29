<template>
  <span>
    <RecordPad
      :records="records"
      @clickRemove="clickRemove"
    />
    <Modal
      :modal-open="modalOpen"
      @closeModal="closeModal"
    />
  </span>
</template>

<script lang = 'ts'>
import { inject, ref, computed } from 'vue';
import RecordPad from '../../components/home/RecordPad.vue';
import Modal from '../../components/common/Modal.vue';

const options = {
  name: 'RecordPadCon',
  components: { RecordPad, Modal },
};

export default {
  ...options,
  setup() {
    const modalOpen = ref(false);
    const records = inject<any>('recordVal');
    const removeAllRecord = inject<any>('removeAllRecord');

    const clickRemove = () => {
      if (records.value.length === 0) {
        return;
      }

      modalOpen.value = true;
      removeAllRecord();
    };

    const closeModal = (val: any) => {
      modalOpen.value = val;
    };

    return {
      records, clickRemove, closeModal, modalOpen,
    };
  },
};
</script>
