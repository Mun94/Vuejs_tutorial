<template>
  <RecordPad
    :records="records"
    @clickRemove="clickRemove"
  />
</template>

<script lang = 'ts'>
import { inject, ref, provide } from 'vue';
import RecordPad from '../../components/calculator/RecordPad.vue';

import {
  TModalOpen, TRecords, TClickRemove, TCloseModal, IRecordPadCon, TRemoveAllRecord,
} from '../../types';

const options = {
  name: 'RecordPadCon',
  components: { RecordPad },
};

export default {
  ...options,
  setup() {
    const modalOpen: TModalOpen = ref(false);
    const records: TRecords = inject('recordVal');
    const removeAllRecord: TRemoveAllRecord = inject('removeAllRecord');

    const clickRemove: TClickRemove = () => {
      if (records && records.value.length === 0) {
        return;
      }

      modalOpen.value = true;
      removeAllRecord && removeAllRecord();
    };

    const closeModal: TCloseModal = (val) => {
      modalOpen.value = val;
    };

    provide('modalOpen', modalOpen);
    provide('closeModal', closeModal);

    return { records, clickRemove };
  },
} as IRecordPadCon;
</script>
