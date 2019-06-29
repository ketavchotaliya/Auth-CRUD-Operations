'use strict'

const jwt = require('jsonwebtoken')
const userModel = require('../app/components/auth/usersModel')

module.exports = {
  generateJWT: async (userId, userEmail, sessionId) => {
    try {
      return await jwt.sign({
        user_id: userId,
        email: userEmail,
        session: sessionId
      }, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRE_TIME,
      })
    } catch (e) {
      console.error(`Error in generateJWT : ${e}`)
      throw e
    }
  },

  verifyToken: async (token) => {
    try {
      // split token from bearer keyword
      const tokenData = typeof token.split(' ')[1] === 'undefined' ? token : token.split(' ')[1]
      return await jwt.verify(tokenData, env.JWT_SECRET)
    } catch (e) {
      console.error('Error in verifyToken : ', e)
      throw e
    }
  },

  validateJWT: async (req, res, next) => {
    try {
      const token = req.headers.authorization // Parse token from header

      if (!token) {
        helpers.createResponse(res, constants.BAD_REQUEST,
          messages.ACCESS_TOKEN_REQUIRED, {}
        )
        return
      }

      // verify the jwt token
      let decoded
      try {
        decoded = await module.exports.verifyToken(token)
      } catch(e) {
        console.error(`Error in verifyToken : ${e}`)
        helpers.createResponse(res, constants.UNAUTHORIZED, messages.UNAUTHORIZED_ACCESS, {})
        return
      }

      if (typeof decoded.user_id === 'undefined' || typeof decoded.email === 'undefined' || typeof decoded.session === 'undefined') {
        helpers.createResponse(res, constants.UNAUTHORIZED, messages.UNAUTHORIZED_ACCESS, {})
        return
      }

      // check user session is alive or not
      let userSession
      try {
        userSession = await userModel.findUserSession(decoded.session)
      } catch (e) {
        console.error(`Error in findUserSession : ${e}`)
        helpers.createResponse(res, constants.INTERNAL_SERVER_ERROR,
          messages.SERVER_ERROR_MESSAGE, {}
        )
        return
      }

      if (!userSession) {
        helpers.createResponse(res, constants.UNAUTHORIZED, messages.UNAUTHORIZED_ACCESS, {})
        return
      }

      // add loggedIn user id in request
      req.logged_in_user_id = decoded.user_id

      next()

    } catch (e) {
      console.error(`Error in validateJWT : ${e}`)
      helpers.createResponse(res, constants.INTERNAL_SERVER_ERROR,
        messages.SERVER_ERROR_MESSAGE, {}
      )
    }
  }
}
