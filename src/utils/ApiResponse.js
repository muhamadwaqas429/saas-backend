// ApiResponse provides a consistent structure for all successful API responses.
class ApiResponse {
  constructor(
    statusCode, // HTTP status code (200, 201, etc.)
    data, // Actual response data
    message = "Success" // Optional success message
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;

    // If statusCode < 400 → success = true, otherwise false
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
