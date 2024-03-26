import { useToast } from "primevue/usetoast";

export default function useToastMessages() {
  const toast = useToast();

  const showSuccessToast = (summary, detail) => {
    toast.add({
      severity: "success",
      summary,
      detail,
      life: 3000,
    });
  };

  const showErrorToast = (summary, error) => {
    let content = "";

    if (typeof error === "string") {
      content = error;
      showError(summary, content);
    }

    else {
      if (error && error.errors) {
        error.errors.forEach((error) => {
          content = error.message + "- " + error.field;
          showError(summary, content);
        });
      } 
      
      else if (error && error.response) {
        if (error.response.data) {
          if (error.response.data.errors) {
            error.response.data.errors.forEach((error) => {
              content = error.message;
              showError(summary, content);
            });
          } 
          
          else if (error.response.data.message) {
            content = error.response.data.message;
            showError(summary, content);
          }
        }
      } 
      
      else if (error && error.data) {
        if (error.data.data) {
          showError(error.data.message, error.data.data.errorMessage);
        }
      } else {
        showError(summary, "There was an error processing your request.");
      }

    }
  };

  const showError = (summary, error) => {
    toast.add({
      severity: "error",
      summary: summary,
      detail: error,
      life: 10000,
    });
  };

  return { showSuccessToast, showErrorToast };
}
