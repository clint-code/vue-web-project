import apim from "./apim.js";

export default {
    postPayment(data) {
        return apim().post("/postPayment", data);
    },

    checkPaymentStatus(data) {
        return apim().post("/checkPaymentStatus", data)
    }
};