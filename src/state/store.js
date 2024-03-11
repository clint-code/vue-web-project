import { reactive } from 'vue'

export const store = reactive({
  getQuoteDetails: null,

  setGetQuoteDetails(value) {
    this.getQuoteDetails = value
  }
})