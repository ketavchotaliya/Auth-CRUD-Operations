/* eslint-disable no-undef */

const userSchema = require('./usersSchema')
const userSessionSchema = require('./userSessionSchema')
const bcrypt = require('bcrypt')

module.exports = {
  findUserWithCriteria: async (criteriaObj) => {
    try {
      return await userSchema.findOne({
        attributes: ['user_id', 'first_name', 'last_name', 'email', 'dob',
          'is_active', 'is_delete', 'password', 'photo'],
        where: criteriaObj
      })
    } catch (e) {
      console.error(`Error in findUserWithEmail : ${e}`)
      throw e
    }
  },

  createUser: async (userObj, transaction = null) => {
    try {
      if (transaction) {
        return await userSchema.create(userObj, transaction)
      } else {
        return await userSchema.create(userObj)
      }
    } catch (e) {
      console.error(`Error in createUser function :  ${e}`)
      throw e
    }
  },

  crerateUserSession: async (userSessionObj, transaction = null) => {
    try {
      if (transaction) {
        return await userSessionSchema.create(userSessionObj, transaction)
      } else {
        return await userSessionSchema.create(userSessionObj)
      }
    } catch (e) {
      logger.error(`Error during store user session: ${e}`)
      throw e
    }
  },

  encryptPassword: async (password = '') => {
    return bcrypt.hashSync(password, env.BCRYPT_SALT)
  },

  comparePassword: async (password, encPassword) => {
    try {
      return bcrypt.compareSync(password, encPassword)
    } catch (e) {
      throw e
    }
  },

  findUserSession: async (sessionId) => {
    try {
      return await userSessionSchema.findOne({
        attributes: ['user_id', 'session_id', 'session_timeout', 'stay_logged_in',
          'login_date', 'logout_date', 'is_active'],
        where: {
          session_id: sessionId
        }
      })
    } catch (e) {
      console.error(`Error in findUserSession : ${e}`)
      throw e
    }
  },

  updateUser: async (userObj, criteriaObj, transaction = null) => {
    try {
      if (transaction) {
        return await userSchema.update(userObj, {
          where: criteriaObj
        }, transaction)
      } else {
        return await userSchema.update(userObj, {
          where: criteriaObj
        })
      }
    } catch (e) {
      console.error(`Error in updateUser function :  ${e}`)
      throw e
    }
  },

  deleteUserSession: async (criteriaObj, transaction = null) => {
    try {
      if (transaction) {
        return await userSessionSchema.destroy({
          where: criteriaObj
        }, transaction)
      } else {
        return await userSessionSchema.destroy({
          where: criteriaObj
        })
      }
    } catch (e) {
      console.error(`Error in deleteUserSession function :  ${e}`)
      throw e
    }
  },
}
