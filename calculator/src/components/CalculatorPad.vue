<template>
  <div class="CalculatorPadWrap">
    <table class="tableWrap">
      <tr>
        <td><Button disabled /></td>
        <td>
          <Button @click="clickEvent('', 'clearEntry')">
            CE
          </Button>
        </td>
        <td>
          <Button @click="clickEvent('', 'clear')">
            C
          </Button>
        </td>
        <td>
          <Button @click="clickEvent('', 'backspace')">
            <font-awesome-icon
              icon="backspace"
              class="icon alt"
            />
          </Button>
        </td>
      </tr>
      <tr>
        <td><Button disabled /></td>
        <td><Button disabled /></td>
        <td><Button disabled /></td>
        <td>
          <Button @click="clickEvent('/', 'operator')">
            /
          </Button>
        </td>
      </tr>
      <tr>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('7', 'number')"
          >
            7
          </Button>
        </td>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('8', 'number')"
          >
            8
          </Button>
        </td>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('9', 'number')"
          >
            9
          </Button>
        </td>
        <td>
          <Button @click="clickEvent('*', 'operator')">
            *
          </Button>
        </td>
      </tr>
      <tr>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('4', 'number')"
          >
            4
          </Button>
        </td>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('5', 'number')"
          >
            5
          </Button>
        </td>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('6', 'number')"
          >
            6
          </Button>
        </td>
        <td>
          <Button @click="clickEvent('-', 'operator')">
            -
          </Button>
        </td>
      </tr>
      <tr>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('1', 'number')"
          >
            1
          </Button>
        </td>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('2', 'number')"
          >
            2
          </Button>
        </td>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('3', 'number')"
          >
            3
          </Button>
        </td>
        <td>
          <Button @click="clickEvent('+', 'operator')">
            +
          </Button>
        </td>
      </tr>
      <tr>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('', 'plusMinus')"
          >
            +/-
          </Button>
        </td>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('0', 'number')"
          >
            0
          </Button>
        </td>
        <td>
          <Button
            button-type="num"
            @click="clickEvent('.', 'number')"
          >
            .
          </Button>
        </td>
        <td>
          <Button @click="clickEvent('', 'enter')">
            =
          </Button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang = 'ts'>
import { useStore, Store } from 'vuex';
import Button, { IButton } from './common/Button.vue';

interface ICalculatorPad {
  name: string;
  setup: () => { clickEvent: any };
  components: { Button: IButton };
}

export default {
  name: 'CalculatorPad',
  setup() {
    const store: Store<any> = useStore();

    const clickEvent = (val: string, controller: string): void => {
      store.dispatch('cal', { val, controller });
    };

    return { clickEvent };
  },
  components: { Button },
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
