import apim from './apim.js'

export default {
    verifyCustomer(data) {
        return apim().post('/verifyCustomer', data)
    },

    createCustomer(data) {
        return apim().post('/createCustomer', data)
    }
}