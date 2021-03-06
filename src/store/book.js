import services from "../services/book";

const state = () => ({
  books: {},
});

const getters = {
  allBooks: (state) => state.books,
};

const mutations = {
  setBooks: (state, books) => (state.books = books),
};

const actions = {
  // get BOOK data from API
  fetchBookAction: async ({ commit }) => {
    try {
      //destructuring
      const { data } = await services.fetchBook(); // call api
      console.log("Book Fetched", data);
      commit("setBooks", data);
    } catch (error) {
      console.log("Fetch books ERROR --- " + error);
      throw new Error(error.response.data.message);
    }
  },

  // CREATE a book
  createBookAction: ({ commit }, data) => {
    try {
      return services.createBook(data);
      // Need to be handled if need such update book data on UI =============================================
    } catch (error) {
      console.log("Create book ERROR --- " + error);
      throw new Error(error.response.data.message);
    }
  },

  // UPDATE a book
  updateBookAction: ({ commit }, payload) => {
    try {
      return services.updateBook(payload.id, payload.data);
      // Need to be handled if needed ====================
    } catch (error) {
      console.log("Update book ERROR --- " + error);
      throw new Error(error.response.data.message);
    }
  },

  // DELETE a book
  deleteBookAction: ({ commit }, id) => {
    try {
      console.log("delete action");
      return services.deleteBook(id);
      // Need to be handled if needed====================
    } catch (error) {
      console.log("Delete book ERROR --- " + error);
      throw new Error(error.response.data.message);
    }
  },
};

export default { namespaced: true, state, getters, mutations, actions };
