<script setup>
import { ref } from 'vue'

import { SORT_OPTIONS } from './constants'

const sortDirection = ref('increasing')
const emit = defineEmits(['onChangeDirection'])
</script>

<template>
  <select v-model="sortDirection" @change="emit('onChangeDirection', sortDirection)">
    <option v-for="option in SORT_OPTIONS" :key="option.id" :value="option.direction">
      {{ option.label }}
    </option>
  </select>
</template>
