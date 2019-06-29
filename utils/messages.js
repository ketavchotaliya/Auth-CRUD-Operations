'use strict'

module.exports = {
  SERVER_ERROR_MESSAGE: 'Internal Server Error.',
  SERVICE_UNAVAILABLE: 'Service is unavailable. Please try after some time!',
  ACCESS_DENIED: 'Access Denied!',
  INVALID_REQUEST: 'Your request is invalid!!',
  INVALID_TOKEN: 'Your token is invalid',
  TOKEN_EXPIRED: 'Token is expired!',
  USER_ALREADY_VERIFIED: 'User already verified!',
  USER_ALREADY_EXISTS: 'User already exists!',
  USER_IS_DEACTIVATED: 'User is deactivated!',
  LOGIN_FIAL: 'Invalid credentials!',
  ACCESS_TOKEN_REQUIRED: 'Authorization token is required!',
  UNAUTHORIZED_ACCESS: 'Unauthorised access!',
  PASSWORD_WRONG: 'Current password does not match with our records!',
  PASSWORD_CHANGED: 'Password has been changes successfully!',
  LOGGED_OUT_SUCCESS: 'Logged out successfully!',
  MAIL_SENT: 'OTP has been sent on your registered email!',

  /**
   * It will return module signup message
   *
   * @param module
   *
   * @return {string}
   */
  signupSuccess: (module) => {
    return module + ' registered successfully'
  },

  /**
   * It will return required field message
   *
   * @param {string} fieldName
   *
   * @return {string}
   */
  checkIfRequired: (fieldName) => {
    return fieldName + ' is required.'
  },

  /**
   * It will return message for valid URL.
   *
   * @param {string} fieldName
   *
   * @return {string}
   */
  checkIfURL: (fieldName) => {
    return 'The ' + fieldName + ' must be a valid URL.'
  },

  /**
   * It will return message for alphanumeric field validation.
   *
   * @param {string} fieldName
   *
   * @return {string}
   */
  checkIfAlphaNumeric: (fieldName) => {
    return 'The ' + fieldName + ' must be alpha numeric.'
  },

  /**
   * It will return message for numeric field validation.
   *
   * @param {string} fieldName
   *
   * @return {string}
   */
  checkIfNumeric: (fieldName) => {
    return 'The ' + fieldName + ' field must be numeric.'
  },

  /**
   * It will return message for image extension validation
   *
   * @param {string} fieldName
   *
   * @return {string}
   */
  checkImageExtension: (fieldName, extension = 'jpg, png, jpeg') => {
    return 'The ' + fieldName + ' must be in (' + extension + ') format.'
  },

  /**
   * It will return message for valid date validation.
   *
   * @param {string} fieldName
   *
   * @return {string}
   */
  checkIfValidDate: (fieldName, dateFormat = 'YYYY-MM-DD') => {
    return 'The ' + fieldName + ' must be in a (' + dateFormat + ')'
  },

  /**
   * It will return message for valid email.
   *
   * @param {string} fieldName
   *
   * @return {string}
   */
  checkIfEmail: (fieldName) => {
    return fieldName + ' must be a valid email address.'
  },

  /**
   * It will return message for valid integer.
   *
   * @param {string} fieldName
   *
   * @return {string}
   */
  checkInt: (fieldName) => {
    return 'The ' + fieldName + ' must be a valid integer.'
  },

  loginSuccess: () => {
    return 'Logged In successfully!.'
  },

  loginFail: () => {
    return 'Logged In failed!.'
  },

  /**
   * It will return message for valid float value.
   *
   * @param {string} fieldName
   *
   * @return {string}
   */
  checkFloat: (fieldName) => {
    return 'The ' + fieldName + ' must be a valid float value.'
  },

  /**
   * It will return message for number value between min and max value.
   *
   * @param {string} fieldName
   * @param {integer} min
   * @param {integer} max
   *
   * @return {string}
   */
  checkNumberAndMinMax: (fieldName, min, max) => {
    return 'The ' + fieldName + ' must be a number and' +
      ' between ' + min + ' and ' + max + '.'
  },

  /**
   * It will return message for field must be a string with min and max
   * number of characters
   *
   * @param fieldName
   * @param min
   * @param max
   *
   * @return {string}
   */
  checkStringMinAndMax: (fieldName, min, max) => {
    return fieldName + ' must be a string and' +
      ' between ' + min + ' to ' + max + ' characters.'
  },

  /**
   * It will return message for enum validation
   *
   * @param {string} fieldName
   * @param {array} enumArray
   *
   * @return {string}
   */
  checkIfValidEnum: (fieldName, enumArray) => {
    return 'The ' + fieldName + ' must have a valid value from ' + enumArray
  },

  /**
   * It will return message for valid value.
   *
   * @param {string} fieldName
   *
   * @return {string}
   */
  checkIfValidValue: (fieldName) => {
    return 'The ' + fieldName + ' must have a valid value'
  },

  /**
   * It will return message for valid non empty array.
   *
   * @param {string} fieldName
   *
   * @return {string}
   */
  checkIfArray: (fieldName) => {
    return 'The ' + fieldName + ' must not be empty' +
      ' and it should be a valid array.'
  },

  /**
   *  It will return message when both field are not same
   *
   * @param {string} fieldName1
   * @param {string} fieldName2
   *
   * @return {string}
   */
  checkIfSame: (fieldName1, fieldName2) => {
    return fieldName1 + ' and ' + fieldName2 + ' does not match'
  },

  /**
   * It will return message for success in list api.
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_LIST_SUCCESS: (module) => {
    return module + ' list.'
  },

  /**
   * It will return message for error in list api.
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_LIST_ERROR: (module) => {
    return 'Error while listing ' + module + '.'
  },

  /**
   * It will return message for success in store api.
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_STORE_SUCCESS: (module) => {
    return module + ' added successfully!'
  },

  /**
   * It will return message for error is store api
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_STORE_ERROR: (module) => {
    return 'Error while adding ' + module + ' details.'
  },

  /**
   * It will return message for success in specific get component
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_SHOW_SUCCESS: (module) => {
    return module + ' details.'
  },

  /**
   * It will return message for error in specific get component
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_SHOW_ERROR: (module) => {
    return 'Error during getting ' + module + ' details.'
  },

  /**
   * It will return message for components is already exist
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_EXISTS: (module) => {
    return 'The ' + module + ' already exists.'
  },

  /**
   * It will return message while component found
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_FOUND: (module) => {
    return module + ' found.'
  },

  /**
   * It will return message while component not found error
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_NOT_FOUND: (module) => {
    return 'The ' + module + ' you are looking for is not found.'
  },

  /**
   * It will return message for success in update component.
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_UPDATE_SUCCESS: (module) => {
    return module + ' details has been updated successfully!'
  },

  /**
   * It will return message for error in update component
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_UPDATE_ERROR: (module) => {
    return 'Could not able update ' + module + ' details.'
  },

  /**
   * It will return message for components if already updated
   *
   * @param {string} module - component name
   * @param {string} status - status name
   *
   * @return {string}
   */
  MODULE_STATUS_EXISTS: (module, status) => {
    return module + ' has already ' + status + '!'
  },

  /**
   * It will return message for success in enable/disable component.
   *
   * @param {string} module - component name
   * @param {string} status - enable / disable
   *
   * @return {string}
   */
  MODULE_STATUS_CHANGE: (module, status) => {
    return module + ' ' + status + ' successfully!'
  },

  /**
   * It will return message for error in enable/disable component.
   *
   * @param {string} module - component name
   * @param {string} status - enable / disable
   *
   * @return {string}
   */
  MODULE_STAUS_CHANGE_ERROR: (module, status) => {
    return 'Error while ' + status + ' ' + module + '.'
  },

  /**
   * It will return message for error in delete component.
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_DELETE_ERROR: (module) => {
    return 'Error while deleting ' + module
  },

  /**
   * It will return message for success in delete component.
   *
   * @param {string} module - component name
   *
   * @return {string}
   */
  MODULE_DELETE_SUCCESS: (module) => {
    return 'The ' + module + ' has been deleted successfully'
  },

  /**
   * It will return message for error in uploaded file size limit
   *
   * @param {string} field - image field name
   * @param {number} size  - size of validated file.
   *
   * @return {string}
   */
  FILE_SIZE_LIMIT: (field, size) => {
    return 'The ' + field + ' size should be less than ' + size + ' MB.'
  },

  /**
   * It will return message for success during file upload.
   *
   * @param {string} field - image field name
   *
   * @return {string}
   */
  FILE_UPLOAD_SUCCESS: (field) => {
    return 'The ' + field + ' has been uploaded successfully.'
  },

  /**
   * It will return message for valid non empty string.
   *
   * @param {string} fieldName
   * @param {integer} min
   * @param {integer} max
   *
   * @return {string}
   */
  checkLength: (fieldName, min, max) => {
    let minimum = typeof min !== 'undefined' ? min.toString() : ''
    let maximum = typeof max !== 'undefined' ? max.toString() : ''

    if (minimum === maximum) {
      return fieldName + ' length should be ' + maximum + ' characters.'
    } else if (maximum === '') {
      return fieldName + ' length must be at least ' + minimum + ' characters.'
    } else if (minimum === '') {
      return fieldName + ' length should not be greater' +
        ' than ' + maximum + ' characters.'
    } else {
      return fieldName + ' length must be between' +
        ' ' + minimum + ' to ' + maximum + ' characters.'
    }
  },
  /**
   * It will return message for valid json.
   *
   * @param {String} fieldName
   *
   * @return {String}
   */
  checkIfValidJSON: (fieldName = '') => {
    return 'The ' + fieldName + ' must be a valid JSON String.'
  },

  // file upload
  FILE_TYPE_MISMATCH: function (module) {
    return 'The ' + module + ' must be a valid image file.'
  },
  FILE_UPLOAD_ERROR: 'Error during file upload.',

  HIGH_FILE_SIZE: function (module, size) {
    return 'The ' + module + ' can not be grater than ' + size + ' MB.'
  },
  module_disable:(module) => {
    return module + ' is disable'
  },
  module_not_approved:(module) => {
    return module + ' is not approved by admin '
  },
  valiedDate: (fieldName) => {
    return 'The ' + fieldName + ' must be a  grater then today.'
  }

}
