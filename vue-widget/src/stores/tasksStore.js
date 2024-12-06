import { defineStore } from 'pinia'

import { SORT_OPTIONS } from '@/constants'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    errors: {
      addTask: false,
    },
    sortDirection: SORT_OPTIONS.at(0).direction,
  }),

  actions: {
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },

    addTask(newTask) {
      this.errors.addTask = false

      if (!newTask.trim()) {
        return (this.errors.addTask = true)
      }

      this.tasks.unshift({
        id: Date.now(),
        name: newTask,
        isDone: false,
      })

      this.saveTasks()
    },

    handleDeleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)

      this.saveTasks()
    },

    handleSaveEditedTask(taskId, newTaskName) {
      this.tasks = this.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, name: newTaskName }
        }

        return task
      })

      this.saveTasks()
    },

    handleChangeTaskStatus(taskId) {
      this.tasks = this.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone: !task.isDone }
        }

        return task
      })

      this.saveTasks()
    },

    handleChangeDirection(newDirection) {
      this.sortDirection = newDirection
    },
  },
})
