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
            @click="clickEvent(valType.value, valType.type)"
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
import { useStore } from 'vuex';
import Button from './common/Button.vue';

import {
  ICalculatorPad,
  TStore,
  TCalculatorPadVals,
  TClickEvent,
} from '../types';

const options = {
  name: 'CalculatorPad',
  components: { Button },
};

export default {
  ...options,
  setup() {
    const store: TStore = useStore();
    const calculatorPadVals: TCalculatorPadVals = [
      [
        { value: '', type: '' },
        { value: '', type: 'clearEntry', otherVal: 'CE' },
        { value: '', type: 'clear', otherVal: 'C' },
        { value: '', type: 'backspace', otherVal: 'icon' },
      ],
      [
        { value: '', type: '' },
        { value: '', type: '' },
        { value: '', type: '' },
        { value: '/', type: 'operator' },
      ],
      [
        { value: '7', type: 'number' },
        { value: '8', type: 'number' },
        { value: '9', type: 'number' },
        { value: '*', type: 'operator' },
      ],
      [
        { value: '4', type: 'number' },
        { value: '5', type: 'number' },
        { value: '6', type: 'number' },
        { value: '-', type: 'operator' },
      ],
      [
        { value: '1', type: 'number' },
        { value: '2', type: 'number' },
        { value: '3', type: 'number' },
        { value: '+', type: 'operator' },
      ],
      [
        { value: '', type: 'plusMinus', otherVal: '+/-' },
        { value: '0', type: 'number' },
        { value: '.', type: 'number' },
        { value: '', type: 'enter', otherVal: '=' },
      ],
    ];

    const clickEvent: TClickEvent = (val, controller) => {
      store.dispatch('cal', { val, controller });
    };

    return { clickEvent, calculatorPadVals };
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
