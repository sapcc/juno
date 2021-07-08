class HTTPError extends Error {
  constructor(statusCode, message) {
    super(message)
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name
    this.statusCode = statusCode
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
    Error.captureStackTrace(this, this.constructor)
  }
}

class AuthenticationError extends HTTPError {
  constructor(message) {
    super(401, message)
  }
}

class AuthorizationError extends HTTPError {
  constructor(message) {
    super(403, message)
  }
}

module.exports = {
  HTTPError,
  AuthenticationError,
  AuthorizationError,
}
