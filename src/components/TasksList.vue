<script setup>
import { ref } from 'vue'
import TaskRow from './TaskRow.vue'

const props = defineProps({
  tasks: {
    type: Object,
    required: true,
  },
  onDeleteTask: { type: Function, required: true },
  onSaveEditedTask: { type: Function, required: true },
})

const editError = ref(false)

const taskEditId = ref(null)

const handleSaveChanges = (taskId, newTaskName) => {
  editError.value = false

  if (!newTaskName.trim()) return (editError.value = true)

  props.onSaveEditedTask(taskId, newTaskName)
  taskEditId.value = null
}
</script>

<template>
  <ul>
    <TaskRow
      v-for="task in tasks"
      :key="task.id"
      :task
      :onDeleteTask
      :onEditTask="(id) => (taskEditId = id)"
      :isTaskEditing="taskEditId === task.id"
      :onSaveEditedTask="handleSaveChanges"
      :onCloseEditedTask="() => (taskEditId = null)"
    />
  </ul>
  <label v-show="editError">низя пустую строку</label>
</template>
