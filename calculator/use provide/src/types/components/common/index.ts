import { Ref, ComputedRef } from 'vue';

// Button.vue
export interface IProps {
    [key: string]: any;
}

export type TBackgroundColor = ComputedRef<string>;

export interface IButton {
    name: string;
    props: { [key: string]: IProps };
    setup: (props: IProps) => { backgroundColor: TBackgroundColor };
}

// Modal.vue
export interface IModal {
    name: string;
    setup: () => {
        modalOpen: Ref<boolean> | undefined;
        closeModal: (val: boolean) => void
   };
}
