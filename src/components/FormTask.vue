<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['add-task'])

const newTask = ref('')

const addTask = () => {
  emit('add-task', newTask.value)
  newTask.value = ''
}
</script>

<template>
  <input v-model="newTask" placeholder="new task" />
  <button @click="addTask">Add Task</button>
</template>
