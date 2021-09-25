<template>
  <div class="recordPadWrap">
    <div>
      <div v-if="records.length > 0" class="existRecords">
        <div v-for="record in records" :key="record">
          <div class="process">{{ record.process.replaceAll(" ", "") }} =</div>
          <div class="result">
            {{ record.result }}
          </div>
        </div>
      </div>
      <div v-else class="noneRecords">기록 없음</div>
    </div>
    <div class="remove" @click="removeAllRecord">
      <font-awesome-icon icon="trash" class="icon alt" />
    </div>
    <Modal :modal-open="modalOpen" @toggle-modal="toggleModal" />
  </div>
</template>

<script lang = 'ts'>
import { computed, ComputedRef, ref, Ref } from "vue";
import { useStore } from "vuex";
import Modal from "./common/Modal.vue";

import { TStore, IRecordPad } from "../types";

// export interface IRecordPad {
//     name: string,
//     setup: () => {
//         modalOpen: Ref<boolean>,
//         records: Ref<string | string[]>,
//         removeAllRecord: ComputedRef<string>,
//         toggleModal: () => string
//     },
//     components: { Modal: unknown | IModal }
// }

export default {
  name: "RecordPad",
  setup() {
    const store: TStore = useStore();
    const modalOpen: Ref<boolean> = ref<boolean>(false);

    const recordVal: string[] = computed(() => store.getters.recordVal).value;
    const records: Ref<string[] | string> = ref<string[] | string>(
      recordVal.length > 0 ? [...recordVal].reverse() : ""
    );

    const removeAllRecord: ComputedRef<string> = computed(() => {
      modalOpen.value = true;
      records.value = "";
      store.commit("REMOVE_ALL_RECORD");

      return "";
    });

    const toggleModal = (val: boolean): string => {
      modalOpen.value = val;

      return "";
    };

    return {
      modalOpen,
      records,
      removeAllRecord,
      toggleModal,
    };
  },
  components: { Modal },
} as IRecordPad;
</script>

<style scoped>
.recordPadWrap {
  padding: 10px;
  background: #272727;
  color: #ffffff;
}
.noneRecords {
  height: 320px;
  text-align: left;
}
.existRecords {
  height: 320px;
  overflow: auto;
  text-align: right;
}
.process {
  margin-top: 5px;
  word-break: break-word;
  letter-spacing: 5px;
}
.result {
  margin-top: 5px;
  font-size: 25px;
}
.remove {
  margin-top: 5px;
  text-align: right;
}
.remove svg {
  width: 20px;
  height: 25px;
  cursor: pointer;
}
</style>
