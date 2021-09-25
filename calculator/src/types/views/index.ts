import { ComputedRef } from 'vue';
import { ICalculationScreen, IRecordPad, ICalculatorPad } from '..';

// Home.vue
export type TTogglePad = ComputedRef<IRecordPad | ICalculatorPad>

export interface IHome {
    name: string;
    components: { CalculationScreen: Pick<ICalculationScreen, 'name'> },
    setup: () => {
      togglePad: TTogglePad
    }
  }
