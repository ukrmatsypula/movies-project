<template>
  <BContainer>
    <h3 class="list-title">{{ listTitle }}</h3>
    <BRow>
      <template v-if="isExist">
        <BCol
          class="col-sm-6 col-lg-4 col-xl-3 col-xxl-3"
          cols="12"
          v-for="(movie, key) in list"
          :key="key"
        >
          <MovieItem
            :movie="movie"
            @mouseover.native="onMouseOver(movie.Poster)"
            @removeItem="onRemoveItem"
          />
        </BCol>
      </template>
      <template v-if="!isExist">
        <div>Empty list</div>
      </template>
    </BRow>
  </BContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieItem from "@/components/MovieItem";

export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    MovieItem,
  },
  computed: {
    ...mapGetters("movies", ["moviesLength", "isSearch", "resultLength"]),
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearch
        ? `Search result ${this.resultLength}`
        : `IMDB Top ${this.moviesLength}`;
    },
  },
  methods: {
    ...mapActions("movies", ["removeMovies"]),
    ...mapActions(["showNotify"]),
    onMouseOver(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemoveItem({ title, id }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Do you want to delete this film? ${title}`
      );

      if (isConfirmed) {
        this.removeMovies(id);
        this.showNotify({
          msg: "Movie deleted successfull",
          variant: "success",
          title: "Success",
        });
      }
    },
  },
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>
