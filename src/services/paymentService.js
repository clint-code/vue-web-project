import apim from "./apim.js";

export default {
    postPayment(data) {
        return apim().post("/postPayment", data);
    }
};