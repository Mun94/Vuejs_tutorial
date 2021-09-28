<template>
  <button>{{ computedMsg }}</button>
  {{ text }}
</template>

<script setup lang = "ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
    msg: {}
});

const text: any = '112323';

const computedMsg = computed(() => props.msg + '!!!')
</script>