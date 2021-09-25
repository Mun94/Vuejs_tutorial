<template>
  <div class="screenWrap">
    <div class="title">계산기</div>
    <div class="recordIcon">
      <font-awesome-icon icon="clock" class="icon alt" @click="changeScreen" />
    </div>
    <div class="process">
      {{ process || "계산 과정" }}
    </div>
    <div class="result">
      {{ result }}
    </div>
  </div>
</template>

<script lang = 'ts'>
import { computed } from "vue";
import { useStore } from "vuex";

import { TStore, ICalculationScreen, TProcess, TResult } from "../types";

export default {
  name: "CalculatorScreen",
  setup() {
    const store: TStore = useStore();

    const changeScreen = (): void => store.commit("CHANGE");

    const process: TProcess = computed(() => store.getters.processVal);

    const result: TResult = computed(() => store.getters.resultVal);

    return { process, result, changeScreen };
  },
} as ICalculationScreen;
</script>

<style scoped>
.screenWrap {
  padding: 10px;
  height: 200px;

  background: #565656;
}

.title {
  text-align: left;

  color: #ffffff;
}

.result {
  max-height: 110px;
  word-break: break-word;

  font-size: 40px;

  overflow: auto;
}

.recordIcon,
.result,
.process {
  text-align: right;

  color: #ffffff;
}

.process {
  letter-spacing: 5px;
}

.recordIcon {
  font-size: 25px;

  cursor: pointer;
}

.result,
.process {
  margin-top: 15px;
}
</style>
