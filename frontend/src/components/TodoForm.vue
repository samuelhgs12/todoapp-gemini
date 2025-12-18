<script setup lang="ts">
import { ref } from 'vue';

const newTodoTitle = ref('');
const emit = defineEmits(['add-todo']);

const handleSubmit = () => {
  if (newTodoTitle.value.trim()) {
    emit('add-todo', newTodoTitle.value.trim());
    newTodoTitle.value = '';
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <input
      type="text"
      v-model="newTodoTitle"
      placeholder="What needs to be done?"
      class="todo-input"
    />
    <button type="submit" class="add-btn">Add Todo</button>
  </form>
</template>

<style scoped>
.todo-form {
  display: flex;
  margin-bottom: 20px;
}

.todo-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #444;
  background-color: #2c2c2c;
  color: #fff;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.todo-input:focus {
  outline: none;
  border-color: #42b883;
}

.add-btn {
  padding: 10px 20px;
  border: none;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  font-size: 1rem;
}

.add-btn:hover {
  background-color: #369a6e;
}
</style>
