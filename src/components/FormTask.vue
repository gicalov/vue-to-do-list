<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-task'])

const newTask = ref('')
const inputField = ref()

const addTask = () => {
  emit('add-task', newTask.value)
  newTask.value = ''
  inputField.value.focus()
}
</script>

<template>
  <input v-model="newTask" placeholder="New task" ref="inputField" />
  <button @click="addTask">Add Task</button>
</template>
