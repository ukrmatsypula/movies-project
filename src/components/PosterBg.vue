<template>
  <div class="poster-bg" :style="posterStyle"></div>
</template>

<script>
export default {
  name: "PosterBg",
  props: {
    poster: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    defaultPosterBg:
      "linear-gradient(65deg,rgb(45, 54, 146) 30%, rgb(61, 144, 211) 60%, rgb(6, 77, 90) 100%)",
  }),
  computed: {
    posterStyle() {
      return {
        "background-image": this.posterBg,
      };
    },
    posterBg() {
      return this.poster ? `url(${this.poster})` : this.defaultPosterBg;
    },
  },
};
</script>

<style scoped>
.poster-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: all 0.2s linear;
}

.poster-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  display: block;
  background-image: linear-gradient(
    65deg,
    rgb(45, 54, 146) 30%,
    rgb(61, 144, 211) 60%,
    rgb(6, 77, 90) 100%
  );
}
</style>
