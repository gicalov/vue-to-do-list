<script setup>
import { ref, onMounted } from 'vue'
import FormTask from './components/FormTask.vue'
import TasksList from './components/TasksList.vue'
const tasks = ref([])
const errors = ref({ addTask: false })

onMounted(async () => {
  const response = await fetch('/data.json')

  tasks.value = await response.json()
})

const addTask = (newTask) => {
  errors.value.addTask = false

  if (!newTask.trim()) {
    errors.value.addTask = true
    return
  }

  tasks.value.push({ id: tasks.value.at(-1) ? tasks.value.at(-1).id + 1 : 0, name: newTask })
}

const handleDeleteTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)
}

const handleSaveEditedTask = (taskId, newTaskName) => {
  tasks.value = tasks.value.map((task) => {
    if (task.id === taskId) return { id: taskId, name: newTaskName }

    return task
  })
}
</script>

<template>
  <main>
    <div class="details">
      <FormTask @add-task="addTask" />
    </div>
    <label v-show="errors.addTask">ошибся, но где</label>
    <TasksList :tasks :onDeleteTask="handleDeleteTask" :onSaveEditedTask="handleSaveEditedTask" />
  </main>
</template>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
}
</style>
