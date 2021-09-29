<template>
  <div class="recordPadWrap">
    <div>
      <div
        v-if="records.length > 0"
        class="existRecords"
      >
        <div
          v-for="record in records"
          :key="record"
        >
          <div class="process">
            {{ record.process.replaceAll(" ", "") }} =
          </div>
          <div class="result">
            {{ record.result }}
          </div>
        </div>
      </div>
      <div
        v-else
        class="noneRecords"
      >
        기록 없음
      </div>
    </div>
    <div
      class="remove"
      @click.once="$emit('clickRemove')"
    >
      <font-awesome-icon
        icon="trash"
        class="icon alt"
      />
    </div>
    <!-- <Modal
      :modal-open="modalOpen"
      @toggle-modal="toggleModal"
    /> -->
  </div>
</template>

<script lang = 'ts'>
import { inject } from 'vue';

const options = {
  name: 'RecordPad',
  props: {
    records: {
      type: Array,
    },
  },
  emits: ['clickRemove'],
};

export default {
  ...options,
  setup() {
  },
};
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
