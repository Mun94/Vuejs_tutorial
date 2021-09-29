import { TCalculationActions, IButton } from '..';

export * from './common';

export interface ICalculatorPad {
    name: string;
    props: { [key: string]: any };
    components: { Button: IButton };
    setup: () => {
        calculationActions: TCalculationActions
    };
}
