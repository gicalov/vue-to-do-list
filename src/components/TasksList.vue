<script setup>
import { ref, computed } from 'vue'
import TaskRow from '@/components/TaskRow.vue'
import PaginationPages from '@/components/PaginationPages.vue'

const props = defineProps({
  sortedTasks: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['change-task-status', 'delete-task', 'save-edited-task'])

const editError = ref(false)
const taskEditId = ref(null)

const currentPage = ref(1)
const itemsPerPage = 3

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return props.sortedTasks.slice(start, end)
})

const handleSaveChanges = (taskId, newTaskName) => {
  editError.value = false

  if (!newTaskName.value.trim()) {
    return (editError.value = true)
  }

  emit('save-edited-task', taskId, newTaskName.value)
  taskEditId.value = null
}

const totalPages = computed(() => Math.ceil(props.sortedTasks.length / itemsPerPage))

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

const handleDeleteTask = (taskId) => {
  emit('delete-task', taskId)
  if (
    currentPage.value === totalPages.value &&
    props.sortedTasks.length % itemsPerPage === 1 &&
    currentPage.value !== 1
  ) {
    currentPage.value = currentPage.value - 1
  }
}

const handleCloseEditedTask = () => {
  taskEditId.value = null
  editError.value = false
}

const handleChangeTaskStatus = (taskId) => emit('change-task-status', taskId)
</script>

<template>
  <ul class="task-list">
    <TaskRow
      v-for="task in paginatedTasks"
      :key="task.id"
      :task
      :isTaskEditing="taskEditId === task.id"
      @delete-task="handleDeleteTask"
      @edit-task="(id) => (taskEditId = id)"
      @save-edited-task="handleSaveChanges"
      @close-edited-task="handleCloseEditedTask"
      @change-task-status="handleChangeTaskStatus"
    />
  </ul>
  <label v-show="editError">incorrect edit field</label>
  <PaginationPages :totalPages :currentPage @change-page="changePage" />
</template>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 260px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
}
</style>
