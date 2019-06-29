'use strict'

module.exports = {
  // HTTP Status codes
  SUCCESS: 200, // success
  BAD_REQUEST: 400, // request could not be understood by the server
  UNAUTHORIZED: 401, // user authentication required like Authorization header
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403, // When server understood the request, but is refusing to
  // fulfill it.
  NOT_FOUND: 404, // When request uri does not match
  REQUEST_TIMEOUT: 408,
  REQUEST_ENTITY_LARGE: 413, // The server is refusing
  // to process a request because the request entity
  // is larger than the server is willing or able to process
  UPGRADE_REQUIRED: 426,
  UNPROCESSED: 422, // When semantically erroneous
  TOO_MANY_REQUEST: 429, // when user has sent too many
  // requests in a given amount of time
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  CUSTOM_ERROR_CODE: 601, // custom error code for microservice

  // custom Http status codes
  // Pagination parameters
  SORT_BY: 'created_at',
  SORT_ORDER: 'desc',
  PAGE_NUMBER: 1,
  RECORDS_PER_PAGE: 10,

  // token type
  tokenType: {
    FORGOT_PWD: 'forgot-pwd',
    RESET_PWD: 'reset-pwd'
  },

  UPLOAD_IMAGE_EXTENSIONS: ['jpeg', 'jpg', 'png'],
  UPLOAD_IMAGE_TYPE: ['image/jpeg', 'image/jpg', 'image/png'],
  MAX_IMAGE_SIZE: 5 // this will be in MBs
}
