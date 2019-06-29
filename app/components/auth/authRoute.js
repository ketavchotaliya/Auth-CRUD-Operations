/* eslint-disable no-undef */
'use strict'

const router = express.Router()
const authController = require('./authController')
const authValidator = require('./authValidator') // validator
const jwtMiddleware = require('../../../middleware/jwtMiddleware')

// add new institute
router.post('/sign-up', [authValidator.authRouteValidate('signUp'),
  authValidator.checkValidationResult], (req, res, next) => {
  authController.signup(req, res)
})

router.post('/login', [authValidator.authRouteValidate('login'),
  authValidator.checkValidationResult], (req, res, next) => {
  authController.login(req, res)
})

router.put('/changePassword', [authValidator.authRouteValidate('changePassword'),
  authValidator.checkValidationResult, jwtMiddleware.validateJWT], (req, res, next) => {
  authController.changePassword(req, res)
})

router.put('/logout', [jwtMiddleware.validateJWT], (req, res, next) => {
  authController.logout(req, res)
})

router.get('/forgotPassword', [authValidator.authRouteValidate('forgotPassword'),
  authValidator.checkValidationResult], (req, res, next) => {
  authController.forgotPassword(req, res)
})

module.exports = router
