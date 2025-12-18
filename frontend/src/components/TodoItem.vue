<script setup lang="ts">
import type { Todo } from '../types/Todo';
import { ref } from 'vue';

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits(['toggle-complete', 'delete-todo', 'edit-todo']);

const isEditing = ref(false);
const newTitle = ref(props.todo.title);

const handleToggleComplete = () => {
  emit('toggle-complete', props.todo.id);
};

const handleDelete = () => {
  emit('delete-todo', props.todo.id);
};

const startEditing = () => {
  isEditing.value = true;
  newTitle.value = props.todo.title;
};

const handleEdit = () => {
  if (newTitle.value.trim() && newTitle.value.trim() !== props.todo.title) {
    emit('edit-todo', props.todo.id, newTitle.value.trim());
  }
  isEditing.value = false;
};
</script>

<template>
  <li :class="{ completed: todo.completed }">
    <div class="view" v-if="!isEditing">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="handleToggleComplete"
        class="toggle"
      />
      <label @dblclick="startEditing">{{ todo.title }}</label>
      <button @click="handleDelete" class="destroy-btn">❌</button>
    </div>
    <div v-else>
      <input
        type="text"
        v-model="newTitle"
        @keyup.enter="handleEdit"
        @blur="handleEdit"
        class="edit-input"
        autofocus
      />
    </div>
  </li>
</template>

<style scoped>
li {
  background-color: #3a3a3a;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

li.completed {
  background-color: #2e4a3c;
}

li.completed label {
  text-decoration: line-through;
  color: #888;
}

.view {
  display: flex;
  align-items: center;
  width: 100%;
}

.toggle {
  margin-right: 15px;
  width: 20px;
  height: 20px;
}

label {
  flex-grow: 1;
  cursor: pointer;
}

.destroy-btn {
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0;
  transition: opacity 0.2s;
}

li:hover .destroy-btn {
  opacity: 1;
}

.edit-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #42b883;
  background-color: #2c2c2c;
  color: #fff;
  border-radius: 4px;
  font-size: 1rem;
}
</style>
