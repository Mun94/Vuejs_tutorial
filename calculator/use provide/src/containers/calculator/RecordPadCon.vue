<template>
  <RecordPad
    :records="records"
    @clickRemove="clickRemove"
  />
</template>

<script lang = 'ts'>
import { inject, ref, provide } from 'vue';
import RecordPad from '../../components/calculator/RecordPad.vue';

const options = {
  name: 'RecordPadCon',
  components: { RecordPad },
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

    provide('modalOpen', modalOpen);
    provide('closeModal', closeModal);

    return { records, clickRemove };
  },
};
</script>
