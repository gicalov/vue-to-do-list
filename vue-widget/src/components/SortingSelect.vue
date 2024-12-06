<script setup>
import { ref } from 'vue'

import { SORT_OPTIONS } from '@/constants'

const sortDirection = ref(SORT_OPTIONS.at(0).direction)
const emit = defineEmits(['change-direction'])

const handleChangeDirection = () => {
  emit('change-direction', sortDirection.value)
}
</script>

<template>
  <select v-model="sortDirection" @change="handleChangeDirection" class="sorting-select">
    <option v-for="option in SORT_OPTIONS" :key="option.id" :value="option.direction">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
.sorting-select {
  max-width: 110px;
  margin: 10px auto;
}
</style>
