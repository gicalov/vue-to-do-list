<script setup>
import { ref } from 'vue'
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  onDeleteTask: { type: Function, required: true },
  onEditTask: { type: Function, required: true },
  isTaskEditing: {
    type: Boolean,
    required: true,
  },
  onSaveEditedTask: { type: Function, required: true },
  onCloseEditedTask: { type: Function, required: true },
})

const editedTask = ref(props.task.name)
</script>

<template>
  <li v-if="isTaskEditing">
    <input v-model="editedTask" placeholder="edit task" />
    <button @click="onSaveEditedTask(task.id, editedTask)">сохранить</button>
    <button @click="onCloseEditedTask(task.id)">отмена</button>
  </li>
  <li v-else>
    <p>{{ task.name }}</p>
    <button @click="onDeleteTask(task.id)">удалить</button>
    <button @click="onEditTask(task.id)">редактировать</button>
  </li>
</template>
