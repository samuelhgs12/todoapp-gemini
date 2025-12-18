<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Todo } from './types/Todo';
import apiClient from './services/api';

import TodoList from './components/TodoList.vue';
import TodoForm from './components/TodoForm.vue';

const todos = ref<Todo[]>([]);

const fetchTodos = async () => {
  try {
    const response = await apiClient.get<Todo[]>('/todos');
    todos.value = response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

const handleAddTodo = async (newTitle: string) => {
  try {
    const response = await apiClient.post<Todo>('/todos', { title: newTitle });
    todos.value.push(response.data);
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

const handleToggleComplete = async (id: number) => {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    try {
      const updatedTodoData = { ...todo, completed: !todo.completed };
      await apiClient.put(`/todos/${id}`, updatedTodoData);
      todo.completed = updatedTodoData.completed;
    } catch (error) {
      console.error(`Error updating todo ${id}:`, error);
    }
  }
};

const handleDeleteTodo = async (id: number) => {
  try {
    await apiClient.delete(`/todos/${id}`);
    todos.value = todos.value.filter((todo) => todo.id !== id);
  } catch (error) {
    console.error(`Error deleting todo ${id}:`, error);
  }
};

const handleEditTodo = async (id: number, newTitle: string) => {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    try {
      const updatedTodoData = { ...todo, title: newTitle };
      await apiClient.put(`/todos/${id}`, updatedTodoData);
      todo.title = newTitle;
    } catch (error) {
      console.error(`Error updating todo ${id}:`, error);
    }
  }
};

onMounted(fetchTodos);
</script>

<template>
  <div id="todo-app-container">
    <h1>Todo App</h1>
    <TodoForm @add-todo="handleAddTodo" />
    <TodoList
      :todos="todos"
      @toggle-complete="handleToggleComplete"
      @delete-todo="handleDeleteTodo"
      @edit-todo="handleEditTodo"
    />
  </div>
</template>

<style scoped>
#todo-app-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #2c2c2c;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

h1 {
  color: #42b883;
  text-align: center;
}
</style>
