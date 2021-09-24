// Button.vue
import { ComputedRef, ToRefs } from 'vue';

export interface IData {
    [key: string]: unknown
}

export type TBackgroundColor = ComputedRef<string>

export interface IButton {
    name: string;
    props: { [key: string]: { [key: string]: any} };
    setup: (props: IData) => { backgroundColor: TBackgroundColor }
}

export type IToRefs = ToRefs<any>

// Modal.vue
export interface IModal {
    name : string;
    props: { [key: string]: { [key: string]: any} };
    emits: string[]
}
