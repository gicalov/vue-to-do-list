<script setup>
import { computed } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import FormTask from '@/components/FormTask.vue'
import TasksList from '@/components/TasksList.vue'
import SortingSelect from '@/components/SortingSelect.vue'
import { SORT_OPTIONS } from '@/constants'

const tasksStore = useTasksStore()

const {
  errors,
  addTask,
  handleDeleteTask,
  handleSaveEditedTask,
  handleChangeTaskStatus,
  handleChangeDirection,
} = tasksStore

const sortedTasks = computed(() => {
  if (tasksStore.sortDirection === SORT_OPTIONS) {
    return tasksStore.tasks
  }
  return [...tasksStore.tasks].sort((a, b) => {
    return tasksStore.sortDirection === 'increasing'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  })
})
</script>

<template>
  <main>
    <div class="app-wrapper">
      <div class="details">
        <FormTask @add-task="addTask" />
      </div>
      <label v-show="errors.addTask">incorrect field!</label>
      <div>
        <TasksList
          :sortedTasks
          @delete-task="handleDeleteTask"
          @save-edited-task="handleSaveEditedTask"
          @change-task-status="handleChangeTaskStatus"
        />
      </div>
      <SortingSelect @change-direction="handleChangeDirection" />
    </div>
  </main>
</template>

<style scoped>
.app-wrapper {
  max-width: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.details {
  display: flex;
  flex-direction: column;
}
</style>
