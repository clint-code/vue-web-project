import { createStore } from "vuex";

const store = createStore({
    state: {
        quotes: null,
        quoteDetails: null,
        selectedQuote: null,
        quoteRef: null,
        
        valuationLocationObject: null,
        valuationLocation: "Choose location",
        valuationDate: "Choose date",
        valuationTime: "Choose time",
        valuationStatus: false,

        personalDetails: null
    },

    mutations: {
        setQuotes(state, value) {
            state.quotes = value
        },

        setQuoteDetails(state, value) {
            state.quoteDetails = value
        },

        setSelectedQuote(state, value) {
            state.selectedQuote = value
        },

        setQuoteRef(state, value) {
            state.quoteRef = value
        },


        setValuationLocationObject(state, value) {
            state.valuationTime = value
        },

        setValuationLocation(state, value) {
            state.valuationLocation = value
        },

        setValuationDate(state, value) {
            state.valuationDate = value
        },

        setValuationTime(state, value) {
            state.valuationTime = value
        },
        
        setValuationStatus(state, value) {
            state.valuationStatus = value
        },
        
        setPersonalDetails(state, value) {
            state.personalDetails = value
        }
    },

    getters: {
        getQuotes: state => state.quotes,
        getQuoteDetails: state => state.quoteDetails,
        getSelectedQuote: state => state.selectedQuote,
        getQuoteRef: state => state.quoteRef,

        setValuationLocationObject: state => state.valuationLocationObject,
        getValuationLocation: state => state.valuationLocation,
        getValuationDate: state => state.valuationDate,
        getValuationTime: state => state.valuationTime,
        getValuationStatus: state => state.valuationStatus,

        getPersonalDetails: state => state.personalDetails
    }
})  

export default store;
