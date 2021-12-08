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
            @showModal="onShowMovieInfo"
          />
        </BCol>
      </template>
      <template v-if="!isExist">
        <div>Empty list</div>
      </template>
    </BRow>
    <BModal
      body-class="movie-modal-body"
      :id="movieInfoModalID"
      size="xl"
      hide-footer
      hide-header
    >
      <MovieInfoModalContent
        :movie="selectedMovie"
        @closeModal="onCloseModal"
      />
    </BModal>
  </BContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieItem from "@/components/MovieItem";
import MovieInfoModalContent from "@/components/MovieInfoModalContent";

export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    movieInfoModalID: "movie-info",
    selectedMovieID: "",
  }),
  components: {
    MovieItem,
    MovieInfoModalContent,
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
    selectedMovie() {
      return this.selectedMovieID ? this.list[this.selectedMovieID] : null;
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
    onShowMovieInfo(id) {
      this.selectedMovieID = id;
      this.$bvModal.show(this.movieInfoModalID);
    },

    onCloseModal() {
      this.$bvModal.hide(this.movieInfoModalID);
      this.movieInfoModalID = null;
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

<style>
.movie-modal-body {
  padding: 0 !important;
}
</style>
