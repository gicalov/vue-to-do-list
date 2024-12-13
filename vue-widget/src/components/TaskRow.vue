<script setup>
import { ref } from 'vue'

import EditIcon from '@/assets/edit-icon.png'
import CloseIcon from '@/assets/close-icon.png'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  isTaskEditing: {
    type: Boolean,
    required: true,
  },
})

const editedTask = ref(props.task.name)
const taskStatus = ref(props.task.isDone)

const emit = defineEmits([
  'change-task-status',
  'delete-task',
  'edit-task',
  'save-edited-task',
  'close-edited-task',
])

const handleSaveTask = () => {
  emit('save-edited-task', props.task.id, editedTask)
}

const handleTaskAction = (action) => {
  emit(action, props.task.id)
}
</script>

<template>
  <li v-if="isTaskEditing">
    <input v-model="editedTask" placeholder="edit task" />
    <button @click="handleSaveTask">сохранить</button>
    <button @click="handleTaskAction('close-edited-task')">отмена</button>
  </li>
  <li v-else class="task-row__item">
    <div class="task-row__data">
      <input
        class="checkbox"
        type="checkbox"
        v-model="taskStatus"
        @change="handleTaskAction('change-task-status')"
      />
      <p v-if="taskStatus">
        <del> {{ task.name }} </del>
      </p>
      <p v-else>{{ task.name }}</p>
    </div>
    <div class="task-row__control-buttons">
      <button @click="handleTaskAction('edit-task')" class="edit-button">
        <img :src="EditIcon" alt="icon" class="edit-icon" />
      </button>
      <button @click="handleTaskAction('delete-task')" class="edit-button">
        <img :src="CloseIcon" alt="icon" class="edit-icon" />
      </button>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.edit-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  max-width: 40px;
  max-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-icon {
  width: 24px;
  height: 24px;
}
.task-row {
  font-size: 20px;

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid green;
    border-radius: 8px;
    gap: 5px;
    font-size: 10px;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  &__data {
    display: flex;

    .checkbox {
      width: 30px;
      border-radius: 20px;
    }
  }

  &__control-buttons {
    display: flex;
    flex-direction: column;
    min-width: 40px;
  }
}
</style>
