/* eslint-disable no-undef */
'use strict'
const {check, validationResult} = require('express-validator/check')
const {matchedData, sanitize} = require('express-validator/filter')

module.exports = {
  checkValidationResult: (req, res, next) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      helpers.createResponse(res, constants.UNPROCESSED,
        result.array()[0].msg, {}
      )
    } else {
      next()
    }
  }, // checkVaidationResult method end

  authRouteValidate: (method) => {
    switch (method) {
      case 'signUp':
        return [
          check('first_name').isLength({min: 1})
            .withMessage(messages.checkIfRequired('First Name'))
            .isLength({min: 1, max: 255})
            .withMessage(messages.checkLength('First Name', 1, 255)),
          check('last_name').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Last Name'))
            .isLength({min: 1, max: 255})
            .withMessage(messages.checkLength('Last Name', 1, 255)),
          check('email').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Email'))
            .isLength({min: 1, max: 100})
            .withMessage(messages.checkLength('Email', 1, 100))
            .isEmail().withMessage(messages.checkIfEmail('Email')),
          check('password')
            .isLength({min: 1})
            .withMessage(messages.checkIfRequired('Password'))
            .isLength({min: 6, max: 10})
            .withMessage(messages.checkLength('Password', 6, 10)),
          check('dob')
            .optional()
            .matches(/^\d{4}-\d{1,2}-\d{1,2}$/).withMessage(messages.checkIfValidDate('Date of Birth')),
        ]

      case 'login':
        return [
          check('email').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Email'))
            .isEmail().withMessage(messages.checkIfEmail('Email')),
          check('password').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Password'))
        ]

      case 'changePassword':
        return [
          check('password')
            .isLength({min: 1})
            .withMessage(messages.checkIfRequired('Password'))
            .isLength({min: 6, max: 10})
            .withMessage(messages.checkLength('Password', 6, 10)),
          check('new_password')
            .isLength({min: 1})
            .withMessage(messages.checkIfRequired('New Password'))
            .isLength({min: 6, max: 10})
            .withMessage(messages.checkLength('New Password', 6, 10))
        ]

      case 'forgotPassword':
        return [
          check('email').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Email'))
            .isLength({min: 1, max: 100})
            .withMessage(messages.checkLength('Email', 1, 100))
            .isEmail().withMessage(messages.checkIfEmail('Email'))
        ]

      default:
        return []
    }
  }
}
