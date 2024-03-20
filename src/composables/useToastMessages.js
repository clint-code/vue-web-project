import { useToast } from "primevue/usetoast"

export default function useToastMessages() {
  const toast = useToast();

  const showSuccessToast = (summary, detail) => {
    toast.add({
      severity: "Success",
      summary,
      detail,
      life: 3000,
    });
  };

  const showErrorToast = (summary, error) => {
    let content = ""
    console.log(error)

    if (typeof error === "string") {
      content = error
      showError(summary, content)
    }

    else {
      if (error.errors) {
        error.errors.forEach(error => {
          
          content = error.message
          console.log(content)
          showError(summary, content)
        })
      }

      else if(error.response) {
        if(error.response.data) {
          if (error.response.data.errors) {
            error.response.data.errors.forEach(error => {
              
              content = error.message
              showError(summary, content)
            })
          }
        }
      }

      else {
        showError(summary, "There was an error processing your request.")
      }
    }
  };

  const showError = (summary, error) => {
    toast.add({ severity: 'error', summary: summary, detail: error, life: 10000 })
  }

  return { showSuccessToast, showErrorToast };
}