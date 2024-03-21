import { createStore } from "vuex";

const store = createStore({
  state: {
    quoteDetails: null,
    selectedQuote: null,
    quoteRef: null,
    quotes: null,
  },

  mutations: {
    setQuoteDetails(state, value) {
      state.quoteDetails = value;
    },

    setSelectedQuote(state, value) {
      state.selectedQuote = value;
    },

    setQuoteRef(state, value) {
      state.quoteRef = value;
    },

    setQuotes(state, value) {
      state.quotes = value;
    },
  },

  getters: {
    getQuoteDetails: (state) => state.quoteDetails,
    getSelectedQuote: (state) => state.selectedQuote,
    getQuoteRef: (state) => state.quoteRef,
    getQuotes: (state) => state.quotes,
  },
});

export default store;
