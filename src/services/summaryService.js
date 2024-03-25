import apim from "./apim.js";

export default {
    lipaPolePoleCalculator(data) {
    return apim().post("/lipaPolePoleCalculator", data);
  }
};
