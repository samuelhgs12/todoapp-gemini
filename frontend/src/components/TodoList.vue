<script setup lang="ts">
import type { Todo } from '../types/Todo';
import TodoItem from './TodoItem.vue';

defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits(['toggle-complete', 'delete-todo', 'edit-todo']);

const handleToggleComplete = (id: number) => {
  emit('toggle-complete', id);
};

const handleDelete = (id: number) => {
  emit('delete-todo', id);
};

const handleEdit = (id: number, newTitle: string) => {
  emit('edit-todo', id, newTitle);
};
</script>

<template>
  <ul class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle-complete="handleToggleComplete"
      @delete-todo="handleDelete"
      @edit-todo="handleEdit"
    />
  </ul>
</template>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
