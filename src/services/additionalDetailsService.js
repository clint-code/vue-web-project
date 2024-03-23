import apim from "./apim.js";

export default {
  verifyCustomer(data) {
    return apim().post("/verifyCustomer", data);
  },

  createCustomer(data) {
    return apim().post("/createCustomer", data);
  },

  verifyVehicle(data) {
    return apim().post("/verifyVehicle", data);
  },

  postValuation(data) {
    return apim().post("/postValuation", data);
  },

  getQuoteSummary(data) {
    return apim().post("/getQuoteSummary", data);
  },

  reverifyVehicle(data) {
    return apim().post("/reverifyVehicle", data);
  },
};
