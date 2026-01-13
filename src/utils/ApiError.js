// ApiError standardizes error responses for your APIs
class ApiError extends Error {
  constructor(
    statusCode, // HTTP status code (400, 404, 500, etc.)
    message = "Something went wrong",
    errors = [], // Optional array of detailed errors
    stack = "" // Optional stack trace
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
