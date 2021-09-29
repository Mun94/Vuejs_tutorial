<template>
  <div class="CalculatorPadWrap">
    <table class="tableWrap">
      <tr
        v-for="(calculatorPadVal, idx) in calculatorPadVals"
        :key="idx"
      >
        <td
          v-for="(valType, i) in calculatorPadVal"
          :key="i"
        >
          <Button
            v-if="!valType.type"
            disabled
          />
          <Button
            else
            :button-type="valType.type"
            @click="calculationActions({val: valType.value, controller: valType.type})"
          >
            <p v-if="valType.otherVal === 'icon'">
              <font-awesome-icon
                icon="backspace"
                class="icon alt"
              />
            </p>
            <p else>
              {{ valType.value || valType.otherVal }}
            </p>
          </Button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang = 'ts'>
import { inject } from 'vue';
import Button from '../common/Button.vue';

import { ICalculatorPad } from '../../types';

const options = {
  name: 'CalculatorPad',
  props: {
    calculatorPadVals: {
      type: Object,
    },
  },
  components: { Button },
};

export default {
  ...options,
  setup() {
    const calculationActions = inject('calculationActions');

    return { calculationActions };
  },
} as ICalculatorPad;
</script>

<style scoped>
    .calculatorPadWrap {
        width: 500px;
        height: 100%;
    }

    .tableWrap {
        width: 100%;
        height: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }

    td {
        width: 100%;
        height: 60px;
    }

    tr {
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
</style>
