import { createStore } from "vuex"

const store = createStore({
    state: {
        quoteDetails: null,
        selectedQuote: null,
        quoteRef: null,
    },

    mutations: {
        setQuoteDetails(state, value) {
            state.quoteDetails = value
        },

        setSelectedQuote(state, value) {
            state.selectedQuote = value
        },

        setQuoteRef(state, value) {
            state.quoteRef = value
        }
    },

    getters: {
        getQuoteDetails: state => state.quoteDetails,
        getSelectedQuote: state => state.selectedQuote,
        getQuoteRef: state => state.quoteRef,
    }
})

export default store;