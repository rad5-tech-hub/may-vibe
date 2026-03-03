// Utility to consistently extract user-friendly error messages from axios errors
export function getErrorMessage(err, defaultMessage = "An error occurred") {
  if (!err) return defaultMessage;

  // axios error shape: err.response.data may contain message or error fields
  const responseMessage = err.response?.data?.message;
  const responseError = err.response?.data?.error;

  return (
    responseMessage ||
    responseError ||
    err.message ||
    defaultMessage
  );
}
