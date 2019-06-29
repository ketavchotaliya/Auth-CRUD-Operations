'use strict';

const userModel = require('./usersModel');
const jwtMiddleware = require('../../../middleware/jwtMiddleware');

module.exports = {
  /**
   * @typedef signUp
   * @property {string} first_name.required
   * @property {string} last_name.required
   * @property {string} email.required
   * @property {string} password.required
   * @property {string} dob.required
   */
  /**
   * API for register a new user - sign up
   * @route POST /api/v1/auth/sign-up
   * @group auth - APIs for Auth related operations
   * @param {signUp.model} signUp.body.required
   * @returns {object} 200 - Ok
   * @returns {object} 403 - Forbidden
   * @returns {object} 404 - Not Found
   * @returns {object} 422 - Unprocessable Entity
   * @returns {object} 500 - Internal server error
   *
   */
  signup: async (req, res) => {
    try {
      let userPhotoName = '';
      const { first_name, last_name, email, password, dob } = req.body;

      // find user already registered or not
      const findUser = await userModel.findUserWithCriteria({ email });

      if (findUser) {
        console.error(
          `Error in signUp, User with email Id ${email} is already exists!`
        );
        helpers.createResponse(
          res,
          constants.UNPROCESSED,
          messages.MODULE_EXISTS('User'),
          {}
        );
        return;
      }

      if (req.files && req.files.photo) {
        try {
          await helpers.validateImage(req.files.photo);

          userPhotoName = await helpers.uploadFile(
            req.files.photo,
            '/images/users'
          );
        } catch (e) {
          console.log(`Error in validating Image : ${e}`);
          helpers.createResponse(res, e.status, e.message, {});
          return;
        }
      }

      const encryptedPassword = await userModel.encryptPassword(password);
      const userObj = {
        first_name,
        last_name,
        email,
        password: encryptedPassword,
        dob,
        photo: userPhotoName
      };
      const createUser = await userModel.createUser(userObj);

      helpers.createResponse(
        res,
        constants.SUCCESS,
        messages.MODULE_STORE_SUCCESS('User'),
        {}
      );
    } catch (e) {
      console.error(__filename, 'signup', e.stack);
      helpers.createResponse(
        res,
        constants.INTERNAL_SERVER_ERROR,
        messages.SERVER_ERROR_MESSAGE,
        {}
      );
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const findUser = await userModel.findUserWithCriteria({ email });

      if (!findUser) {
        console.error(`User not found with emailId : ${email}`);
        helpers.createResponse(
          res,
          constants.UNPROCESSED,
          messages.LOGIN_FIAL,
          {}
        );
        return;
      }

      if (Number(findUser.dataValues.is_delete) === 1) {
        console.error(`User with emailId : ${email} is deleted`);
        helpers.createResponse(
          res,
          constants.UNPROCESSED,
          messages.LOGIN_FIAL,
          {}
        );
        return;
      }

      // compare user password
      if (
        !(await userModel.comparePassword(
          password,
          findUser.dataValues.password
        ))
      ) {
        console.error(`Email or password is mismatch`);
        helpers.createResponse(
          res,
          constants.UNPROCESSED,
          messages.LOGIN_FIAL,
          {}
        );
        return;
      }

      if (Number(findUser.dataValues.is_active) !== 1) {
        console.error(`User with emailId : ${email} is not activated`);
        helpers.createResponse(
          res,
          constants.UNPROCESSED,
          messages.USER_IS_DEACTIVATED,
          {}
        );
        return;
      }

      // generate session Id for user
      const sessionId = helpers.shuffleString(
        helpers.randomStr(5) + findUser.dataValues.user_id
      );

      // create user session
      await userModel.crerateUserSession({
        user_id: findUser.dataValues.user_id,
        session_id: sessionId,
        login_date: new Date(),
        is_active: true,
        device_type: 1 //default value 1
      });

      // generate JWT for user
      const jwtToken = await jwtMiddleware.generateJWT(
        findUser.dataValues.user_id,
        findUser.dataValues.email,
        sessionId
      );

      let responseObj = {
        user_id: findUser.dataValues.user_id,
        first_name: findUser.dataValues.first_name,
        last_name: findUser.dataValues.last_name,
        dob: findUser.dataValues.dob,
        photo: `http://${env.HOST_NAME}:${env.PORT}${findUser.dataValues.photo}`
      };

      helpers.createResponse(
        res,
        constants.SUCCESS,
        messages.loginSuccess(),
        responseObj,
        {},
        {
          Authorization: jwtToken
        }
      );
    } catch (err) {
      console.log('Error occured : in login', err.message);
      helpers.createResponse(
        res,
        constants.INTERNAL_SERVER_ERROR,
        messages.SERVER_ERROR_MESSAGE,
        {},
        {}
      );
    }
  },

  changePassword: async (req, res) => {
    try {
      const { password, new_password } = req.body;

      // find loggedIN user details
      const findUser = await userModel.findUserWithCriteria({
        user_id: req.logged_in_user_id
      });

      if (!findUser) {
        console.error(`User not found with id : ${req.logged_in_user_id}`);
        helpers.createResponse(
          res,
          constants.UNPROCESSED,
          messages.MODULE_NOT_FOUND('User'),
          {}
        );
        return;
      }

      if (Number(findUser.dataValues.is_delete) === 1) {
        console.error(`User with id : ${req.logged_in_user_id} is deleted`);
        helpers.createResponse(
          res,
          constants.UNPROCESSED,
          messages.MODULE_NOT_FOUND('User'),
          {}
        );
        return;
      }

      // compare user password
      if (
        !(await userModel.comparePassword(
          password,
          findUser.dataValues.password
        ))
      ) {
        console.error(`Current password is mismatch`);
        helpers.createResponse(
          res,
          constants.UNPROCESSED,
          messages.PASSWORD_WRONG,
          {}
        );
        return;
      }

      const encryptedPassword = await userModel.encryptPassword(new_password);

      // create DB Transaction
      const transaction = await sequelizeObj.transaction();

      try {
        // update new password of user
        await userModel.updateUser(
          {
            password: encryptedPassword
          },
          {
            user_id: req.logged_in_user_id
          },
          transaction
        );

        // remove all the active session
        await userModel.deleteUserSession(
          { user_id: req.logged_in_user_id },
          transaction
        );

        await transaction.commit();

        helpers.createResponse(
          res,
          constants.SUCCESS,
          messages.PASSWORD_CHANGED
        );
      } catch (e) {
        await transaction.rollback();
        console.log(
          'Error occured in changePassword during update the password: ',
          err.message
        );
        helpers.createResponse(
          res,
          constants.INTERNAL_SERVER_ERROR,
          messages.SERVER_ERROR_MESSAGE,
          {},
          {}
        );
        return;
      }
    } catch (e) {
      console.log('Error occured in changePassword : ', err.message);
      helpers.createResponse(
        res,
        constants.INTERNAL_SERVER_ERROR,
        messages.SERVER_ERROR_MESSAGE,
        {},
        {}
      );
    }
  },

  logout: async (req, res) => {
    try {
      // verify the jwt token
      let decoded;
      try {
        decoded = await jwtMiddleware.verifyToken(req.headers.authorization);
      } catch (e) {
        console.error(`Error in verifyToken : ${e}`);
        helpers.createResponse(
          res,
          constants.UNAUTHORIZED,
          messages.UNAUTHORIZED_ACCESS,
          {}
        );
        return;
      }

      if (
        typeof decoded.user_id === 'undefined' ||
        typeof decoded.email === 'undefined' ||
        typeof decoded.session === 'undefined'
      ) {
        helpers.createResponse(
          res,
          constants.UNAUTHORIZED,
          messages.UNAUTHORIZED_ACCESS,
          {}
        );
        return;
      }

      // remove user's current session
      await userModel.deleteUserSession({
        session_id: decoded.session,
        user_id: req.logged_in_user_id
      });

      helpers.createResponse(
        res,
        constants.SUCCESS,
        messages.LOGGED_OUT_SUCCESS
      );
    } catch (e) {
      console.error(__filename, 'logout', e.stack);
      helpers.createResponse(
        res,
        constants.INTERNAL_SERVER_ERROR,
        messages.SERVER_ERROR_MESSAGE,
        {}
      );
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const email = req.query.email;

      const findUser = await userModel.findUserWithCriteria({ email });

      if (!findUser) {
        console.error(`User not found with emailId : ${email}`);
        helpers.createResponse(
          res,
          constants.NOT_FOUND,
          messages.MODULE_NOT_FOUND('User')
        );
        return;
      }

      if (Number(findUser.dataValues.is_delete) === 1) {
        console.error(`User with emailId : ${email} is deleted`);
        helpers.createResponse(
          res,
          constants.NOT_FOUND,
          messages.LOGIN_FIAL,
          {}
        );
        return;
      }

      const otpCode = helpers.getRandomInt(100000, 10000);

      // insrty OTP to database
      await userModel.updateUser(
        { forgot_password_otp: otpCode },
        {
          user_id: findUser.dataValues.user_id
        }
      );

      //send an email to user about forgot password OTP.
      const emailData = {
        first_name: findUser.dataValues.first_name,
        last_name: findUser.dataValues.last_name,
        otp: otpCode
      };

      const emailTemplate = BASE_PATH + '/views/emails/forgotPassword.hbs';

      const toEmail = findUser.dataValues.email;

      const subject = 'Forgot Password';

      helpers.sendHtmlMail(emailData, toEmail, subject, emailTemplate);

      helpers.createResponse(res, constants.SUCCESS, messages.MAIL_SENT);
    } catch (e) {
      console.error(__filename, 'forgotPassword', e.stack);
      helpers.createResponse(
        res,
        constants.INTERNAL_SERVER_ERROR,
        messages.SERVER_ERROR_MESSAGE,
        {}
      );
    }
  }
};
