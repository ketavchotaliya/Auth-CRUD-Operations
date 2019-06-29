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

  booksRouteValidate: (method) => {
    switch (method) {
      case 'add':
        return [
          check('name').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Name'))
            .isLength({min: 1, max: 255})
            .withMessage(messages.checkLength('Name', 1, 255)),
          check('price').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Price'))
            .isNumeric()
            .withMessage(messages.checkIfNumeric('Price')),
          check('author_name').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Author Name')),
          check('description').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Description')),
          check('published_date').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Published Date'))
            .matches(/^\d{4}-\d{1,2}-\d{1,2}$/)
            .withMessage(messages.checkIfValidDate('Published date')),
          check('isbn_number').isLength({min: 1})
            .withMessage(messages.checkIfRequired('ISBN Number'))
        ]

      case 'delete':
        return [
          check('book_id').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Book Id'))
            .isNumeric()
            .withMessage(messages.checkIfNumeric('Book Id'))
        ]

      case 'bookDetail':
        return [
          check('book_id').isLength({min: 1})
            .withMessage(messages.checkIfRequired('Book Id'))
            .isNumeric()
            .withMessage(messages.checkIfNumeric('Book Id'))
        ]

      case 'bookList':
        return [
          check('search').optional()
            .isJSON().withMessage(messages.checkIfValidJSON('Search'))
        ]

      default:
        return []
    }
  }
}
