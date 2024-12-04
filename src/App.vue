<script setup>
import { ref, computed } from 'vue'
import FormTask from './components/FormTask.vue'
import TasksList from './components/TasksList.vue'
const tasks = ref([])
const errors = ref({ addTask: false })
const sortDirection = ref('increasing')

tasks.value = JSON.parse(localStorage.getItem('tasks')) || []

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const addTask = (newTask) => {
  errors.value.addTask = false

  if (!newTask.trim()) {
    errors.value.addTask = true

    return
  }

  tasks.value.push({
    id: Date.now(),
    name: newTask,
    isDone: false,
  })

  saveTasks()
}

const handleDeleteTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)

  saveTasks()
}

const handleSaveEditedTask = (taskId, newTaskName) => {
  tasks.value = tasks.value.map((task) => {
    if (task.id === taskId) return { ...task, name: newTaskName }

    return task
  })

  saveTasks()
}

const handleChangeTaskStatus = (taskId) => {
  tasks.value = tasks.value.map((task) => {
    if (task.id === taskId) return { ...task, isDone: !task.isDone }

    return task
  })

  saveTasks()
}

const sortedTasks = computed(() => {
  return tasks.value.slice().sort((elem, nextElem) => {
    return sortDirection.value === 'increasing'
      ? elem.name.localeCompare(nextElem.name)
      : nextElem.name.localeCompare(elem.name)
  })
})
</script>

<template>
  <main>
    <div class="details">
      <FormTask @add-task="addTask" />
    </div>
    <label v-show="errors.addTask">ошибся, но где</label>
    <TasksList
      :sortedTasks
      @onDeleteTask="handleDeleteTask"
      @onSaveEditedTask="handleSaveEditedTask"
      @onChangeTaskStatus="handleChangeTaskStatus"
    />
    <select v-model="sortDirection">
      <option value="increasing">По возрастанию</option>
      <option value="decreasing">По убыванию</option>
    </select>
  </main>
</template>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
}
</style>
