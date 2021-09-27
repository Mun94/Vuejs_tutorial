<template>
    
</template>

<script>
    export default {
        name: 'TodoListContainer'
    }
</script>

<script setup>
    import { ref, readonly, provide } from 'vue';

    const todos = ref([]);

    const initTodos = (init_todos) => {
        todos.value = init_todos;
    };

    const addTodo = (todo, date) => {};
    const removeTodo = (id) => {};
    const completeTodo = (id) => {};

    provide('todos', readonly(todos));
    provide('addTodo', addTodo);
    provide('removeTodo', removeTodo);
    provide('completeTodo', completeTodo);
</script>

