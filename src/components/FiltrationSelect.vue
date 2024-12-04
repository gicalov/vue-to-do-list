<script setup>
import { ref } from 'vue'

const sortDirection = ref('increasing')
const emit = defineEmits(['onChangeDirection'])
const SORT_OPTIONS = [
  { direction: 'increasing', label: 'По возрастанию', id: 1 },
  { direction: 'decreasing', label: 'По убыванию', id: 2 },
]
</script>

<template>
  <select v-model="sortDirection" @change="emit('onChangeDirection', sortDirection)">
    <option v-for="option in SORT_OPTIONS" :key="option.id" :value="option.direction">
      {{ option.label }}
    </option>
  </select>
</template>
