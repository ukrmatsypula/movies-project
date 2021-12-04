<template>
  <div class="movie-item mb-3">
    <div class="movie-item__poster" :style="posterBg"></div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    posterBg() {
      return {
        "background-image": `url(${this.movie.Poster})`,
      };
    },
  },
};
</script>

<style scoped>
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 400px;
}

.movie-item:hover {
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
  transform: scale(1.02);
}

.movie-item__poster {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
