<script setup>
import { ref } from 'vue'
import FormTask from './components/FormTask.vue'
import TasksList from './components/TasksList.vue'
const tasks = ref([])
const errors = ref({ addTask: false })

tasks.value = JSON.parse(localStorage.getItem('tasks')) || [
  { id: 1, name: 'замоканная задача 1', isDone: false },
  { id: 2, name: 'замоканная задача 2', isDone: true },
]

const addTask = (newTask) => {
  errors.value.addTask = false

  if (!newTask.trim()) {
    errors.value.addTask = true
    return
  }

  tasks.value.push({
    id: tasks.value.length
      ? tasks.value.reduce((acc, el) => (acc < el.id ? (acc = el.id) : null), 0) + 1
      : 0,
    name: newTask,
    isDone: false,
  })

  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const handleDeleteTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)

  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const handleSaveEditedTask = (taskId, newTaskName) => {
  tasks.value = tasks.value.map((task) => {
    if (task.id === taskId) return { ...task, name: newTaskName }

    return task
  })

  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const handleChangeTaskStatus = (taskId) => {
  tasks.value = tasks.value.map((task) => {
    if (task.id === taskId) return { ...task, isDone: !task.isDone }

    return task
  })

  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const handleSort = (direction) => {
  if (direction === 'increasing') {
    tasks.value = tasks.value.sort((elem, nextElem) => elem.name.localeCompare(nextElem.name))
  } else {
    tasks.value = tasks.value.sort((elem, nextElem) => nextElem.name.localeCompare(elem.name))
  }

  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}
</script>

<template>
  <main>
    <div class="details">
      <FormTask @add-task="addTask" />
    </div>
    <label v-show="errors.addTask">ошибся, но где</label>
    <TasksList
      :tasks
      @onDeleteTask="handleDeleteTask"
      @onSaveEditedTask="handleSaveEditedTask"
      @onChangeTaskStatus="handleChangeTaskStatus"
    />
    <button @click="handleSort('increasing')">сортировать возрастание</button>
    <button @click="handleSort('decreasing')">сортировать убывание</button>
  </main>
</template>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
}
</style>
