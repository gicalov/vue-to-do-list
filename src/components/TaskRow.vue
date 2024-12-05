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

const emit = defineEmits([
  'onChangeTaskStatus',
  'onDeleteTask',
  'onEditTask',
  'onSaveEditedTask',
  'onCloseEditedTask',
])

const editedTask = ref(props.task.name)
const taskStatus = ref(props.task.isDone)
</script>

<template>
  <li v-if="isTaskEditing">
    <input v-model="editedTask" placeholder="edit task" />
    <button @click="emit('onSaveEditedTask', task.id, editedTask)">сохранить</button>
    <button @click="emit('onCloseEditedTask', task.id)">отмена</button>
  </li>
  <li v-else class="task-row__item">
    <div class="task-row__data">
      <input
        class="checkbox"
        type="checkbox"
        v-model="taskStatus"
        @change="emit('onChangeTaskStatus', task.id)"
      />
      <p v-if="taskStatus">
        <del> {{ task.name }} </del>
      </p>
      <p v-else>{{ task.name }}</p>
    </div>
    <div class="task-row__control-buttons">
      <button @click="emit('onEditTask', task.id)" class="edit-button">
        <img :src="EditIcon" alt="icon" class="edit-icon" />
      </button>
      <button @click="emit('onDeleteTask', task.id)" class="edit-button">
        <img :src="CloseIcon" alt="icon" class="edit-icon" />
      </button>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.edit-button {
  border: none; /* Убираем стандартный стиль кнопки */
  background-color: transparent; /* Сделать фоновый цвет прозрачным */
  cursor: pointer; /* Изменяем курсор при наведении */
}

.edit-icon {
  width: 24px; /* Ширина иконки */
  height: 24px; /* Высота иконки */
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
    word-wrap: break-word;

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
