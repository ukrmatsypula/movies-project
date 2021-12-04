<template>
  <div class="movies-pagination">
    <BPagination
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="total"
      prev-text="Prev"
      next-text="Next"
    />
  </div>
</template>

<script>
export default {
  name: "MoviesPagination",
  data: () => ({
    currentPage: 1,
    total: 100,
    perPage: 12,
  }),
};
</script>

<style scoped>
.movies-pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.movies-pagination >>> .pagination .page-item .page-link {
  color: #fff;
  background-color: transparent;
  font-size: 12px;
}

.movies-pagination >>> .pagination .page-item.active .page-link {
  border-color: #fff;
  background-color: #fff;
  color: #000;
}

.movies-pagination >>> .pagination .page-item.disabled .page-link {
  color: gray;
}
</style>
