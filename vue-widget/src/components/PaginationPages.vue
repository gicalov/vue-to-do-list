<script setup>
defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['change-page'])

const handleChangePage = (newPage) => {
  emit('change-page', newPage)
}
</script>

<template>
  <div v-show="totalPages > 1" class="pagination-pages">
    <button @click="handleChangePage(currentPage - 1)" :disabled="currentPage === 1">
      {{ `<` }}
    </button>
    <button v-for="page in totalPages" :key="page" @click="handleChangePage(page)">
      {{ page === currentPage ? page : '-' }}
    </button>
    <button @click="handleChangePage(currentPage + 1)" :disabled="currentPage === totalPages">
      >
    </button>
  </div>
</template>

<style scoped>
.pagination-pages {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.pagination-pages button {
  padding: 0 3px;
  margin-top: 10px;
}
</style>
