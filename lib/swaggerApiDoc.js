/**
 * {@code swaggerApiDoc} file provide the swagger service for documentation
 * for the APIs.
 * This library is depens on express-swagger-generator version ^1.1.10
 * @author Ketav Chotaliya
 * @since 1.0.0 RELEASE February 05, 2019
 */
'use strict';

const options = {
  swaggerDefinition: {
    info: {
      description: 'This API documentation is related to Auth and CRUD APIs',
      title: 'API Documentation for Auth and CRUD APIs',
      version: '1.0.0'
    },
    host: env.HOST_NAME + ':' + env.PORT,
    basePath: '',
    produces: ['application/json'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token for authenticate the user'
      },
      verificationToken: {
        type: 'apiKey',
        in: 'header',
        name: 'verification-token',
        description: 'Bearer token for user verification'
      }
    }
  },
  basedir: __dirname + '/../', // app absolute path
  files: [
    './app/components/auth/authController.js',
    './app/components/institute/instituteController.js',
    './routes/index.js'
  ] // Path to the API handle folder
};

module.exports = app => {
  const expressSwagger = require('express-swagger-generator')(app);
  expressSwagger(options);
};
