// Button.vue
import { ComputedRef } from 'vue';

export interface IData {
    [key: string]: any;
}

export type TBackgroundColor = ComputedRef<string>;

export interface IButton {
    name: string;
    props: { [key: string]: { [key: string]: any} };
    setup: (props: IData) => { backgroundColor: TBackgroundColor };
}

// Modal.vue
export interface IModal {
    name : string;
    props: { [key: string]: { [key: string]: any} };
    emits: string[];
}
