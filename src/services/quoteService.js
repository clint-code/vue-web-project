import apim from './apim.js'

export default {
    getProducts() {
        return apim().post('/fetchProducts')
    },

    getMakes(data) {
        return apim().post('/makes', data)
    },

    getModels(data) {
        return apim().post('/models', data)
    },

    getQuote(data) {
        return apim().post('/getQuote', data)
    },

    addOrRemoveBenefit(data) {
        return apim().post('/addOrRemoveBenefit', data)
    },

    selectQuoteUnderwriter(data) {
        return apim().post('/selectQuoteUnderwriter', data)
    }
}