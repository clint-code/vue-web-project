export default function usePhoneNumberFormatter() {
    const format = (phone) => {
        const number = parseInt(phone, 10);

        return '254' + number.toString();
    }
  
    return { format }
  }