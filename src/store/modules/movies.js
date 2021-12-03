import IDs from "@/store/mock/my-favorites-250-films";
import axios from "@/plugins/axios";

const moviesStore = {
  namespaced: true,

  state: {
    top250IDs: IDs,
  },
  getters: {},
  mutations: {},
  actions: {
    async fetchMovies(context) {
      console.log(context);
      // tt0111161
      const response = await axios.get("/?i=tt0111161");
      console.log(response);
    },
  },
};

export default moviesStore;
