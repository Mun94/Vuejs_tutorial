<template>
  <RecordPad
    :records="records"
    @removeAllRecord="removeAllRecord"
  />
</template>

<script lang = 'ts'>
import { inject, ref, computed } from 'vue';
import RecordPad from '../../components/home/RecordPad.vue';

const options = {
  name: 'RecordPadCon',
  components: { RecordPad },
};

export default {
  ...options,
  setup() {
    const recordVal = inject<any>('recordVal').value;
    const test = inject<any>('removeAllRecord');
    const records: any = ref(
      recordVal.length > 0 ? [...recordVal].reverse() : []
    );

    const removeAllRecord = () => {
      records.value = [];
      test();

      return '';
    };

    return { records, removeAllRecord };
  },
};
</script>
