<script setup>
import { ref } from 'vue'
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
    <div>
      <button @click="emit('onEditTask', task.id)">редактировать</button>
      <button @click="emit('onDeleteTask', task.id)">удалить</button>
    </div>
  </li>
</template>

<style scoped>
.task-row__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid green;
  border-radius: 8px;
  gap: 5px;
}

.task-row__data {
  display: flex;
}

.checkbox {
  width: 30px;
  border-radius: 20px;
}
</style>
