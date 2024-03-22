export default function useArrayToStringFormatter() {
    const formatArray = (array) => {
        if(array != null && array.length > 0) {
            const firstElement = array[0].replace(/,+$/, '')
            return [firstElement, ...array.slice(1)].join(',')
        }
        else {
            return null
        }
    }
  
    return { formatArray }
  }