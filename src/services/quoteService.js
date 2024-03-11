import apim from './apim.js'

export default {
    getProducts() {
        return apim().post('/fetchProducts')
    },

    getQuote(data) {
        return apim().post('/getQuote', data)
    },

    addOrRemoveBenefit(data) {
        return apim().post('/addOrRemoveBenefit', data)
    }
}