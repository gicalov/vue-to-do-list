<script setup>
import { ref } from 'vue'
import TaskRow from './TaskRow.vue'

defineProps({
  sortedTasks: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['onChangeTaskStatus', 'onDeleteTask', 'onSaveEditedTask'])

const editError = ref(false)
const taskEditId = ref(null)

const handleSaveChanges = (taskId, newTaskName) => {
  editError.value = false

  if (!newTaskName.trim()) {
    return (editError.value = true)
  }

  emit('onSaveEditedTask', taskId, newTaskName)
  taskEditId.value = null
}
</script>

<template>
  <ul class="task-list">
    <TaskRow
      v-for="task in sortedTasks"
      :key="task.id"
      :task
      :isTaskEditing="taskEditId === task.id"
      @onDeleteTask="(taskId) => emit('onDeleteTask', taskId)"
      @onEditTask="(id) => (taskEditId = id)"
      @onSaveEditedTask="handleSaveChanges"
      @onCloseEditedTask="() => (taskEditId = null)"
      @onChangeTaskStatus="(taskId) => emit('onChangeTaskStatus', taskId)"
    />
  </ul>
  <label v-show="editError">низя пустую строку</label>
</template>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
