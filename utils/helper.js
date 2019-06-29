/* eslint-disable no-undef */
'use strict'

const nodemailer = require('nodemailer')

module.exports = {
  createResponse: (res, status, message, payload = {}, pager, header) => {
    pager = typeof pager !== 'undefined' ? pager : {}
    header = typeof header !== 'undefined' ? header : {}

    return res.status(status).set(header).json({
      status: status,
      message: message,
      payload: payload,
      pager: pager
    })
  },

  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * ( max - min + 1 )) + min
  },

  randomStr: (length) => {
    let possible = '0123456789abcdefghijklmnopqrstuvw' +
      'xyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomText = ''
    let i

    for (i = 0; i < length; i++) {
      randomText += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return randomText
  },

  shuffleString: (value) => {
    return value.split('')
      .sort(() => { return 0.5 - Math.random() })
      .join('')
  },

  isArray: (value) => {
    return Array.isArray(value)
  },

  getPageNumber: (req) => {
    let pageNumber = req.body.pageNumber
    pageNumber = ( typeof pageNumber !== 'undefined' && !isNaN(pageNumber) )
      ? parseInt(pageNumber) : constants.PAGE_NUMBER

    return ( pageNumber > 0 ) ? pageNumber : constants.PAGE_NUMBER
  },

  getRecordsPerPage: (req) => {
    let recordsPerPage = ( req.body.recordsPerPage || req.query.recordsPerPage )
    return ( typeof recordsPerPage !== 'undefined' && !isNaN(recordsPerPage) )
      ? parseInt(recordsPerPage) : constants.RECORDS_PER_PAGE
  },

  getSortBy: (schemaName, req) => {
    return ( typeof req.body.sortBy !== 'undefined' )
      ? ' ORDER BY ' + schemaName + '.' + req.body.sortBy
      : ' ORDER BY ' + schemaName + '.' + constants.SORT_BY
  },

  getSortBy_New: (req) => {
    return ( typeof req.body.sortBy !== 'undefined' )
      ? req.body.sortBy
      : constants.SORT_BY
  },

  getSortOrder: (req) => {
    return ( typeof req.body.sortOrder !== 'undefined' )
      ? ' ' + req.body.sortOrder
      : ' ' + constants.SORT_ORDER
  },

  getSortOrder_New: (req) => {
    return ( typeof req.body.sortOrder !== 'undefined' )
      ? req.body.sortOrder
      : constants.SORT_ORDER
  },

  MODULE_STATUS_CHANGE: (module, status) => {
    return module + ' ' + status + ' successfully!'
  },

  emailValidate: (array, key) => {
    for (let i = 0; i < array.length; i++) {
      if (!array[i][key].match('^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$')) {
        return array[i][key]
        break
      }
    }
    return false
  },

  checkIfValidDate: (fieldName) => {
    return 'The ' + fieldName + ' must be a valid date.'
  },

  getObjectKeys: (obj) => {
    try {
      return Object.keys(obj)
    } catch (err) {
      console.error(__filename, 'getObjectKeys', '', 'Error in getObjectKeys', JSON.stringify(err.stack))
      throw err
    }
  },
  getObjectValues: (obj) => {
    try {
      return Object.values(obj)
    } catch (err) {
      console.error(__filename, 'getObjectValues', '', 'Error in getObjectValues', JSON.stringify(err.stack))
      throw err
    }
  },

  validateImage: async (image) => {
    try {
      const imageExtension = image.name.substr(( image.name.lastIndexOf('.') + 1 ))
      // validate image extension and mime type and max_size
      if (!constants.UPLOAD_IMAGE_EXTENSIONS.includes(imageExtension)) {
        console.warn('Image\'s extension is misconfigured.')
        let errObj = {
          status: constants.UNPROCESSED,
          message: messages.FILE_TYPE_MISMATCH('Image')
        }
        throw errObj
      } else if (!constants.UPLOAD_IMAGE_TYPE.includes(image.mimetype)) {
        console.warn('Image\'s mimetype is misconfigured.')
        throw {
          status: constants.UNPROCESSED,
          message: messages.FILE_TYPE_MISMATCH('Question image')
        }
      } else if (image.data.toString().length > ( constants.MAX_IMAGE_SIZE * 1000000 )) {
        console.warn(`Image file is larger than ${constants.MAX_IMAGE_SIZE} MBs.`)
        throw {
          status: constants.UNPROCESSED,
          message: messages.HIGH_FILE_SIZE('Question image', constants.MAX_IMAGE_SIZE)
        }
      } else {
        return true
      }
    } catch (e) {
      throw e
    }
  },

  uploadFile: async (file, pathToUpload) => {
    try {
      // rename file name
      const fileRandNum = helpers.getRandomInt(1000, 9999)

      const fileExtension = file.name.substr(( file.name.lastIndexOf('.') + 1 ))

      const imageName = `${fileRandNum}${Date.now()}.${fileExtension}`

      if (!fs.existsSync(BASE_PATH + '/public' + pathToUpload)) {
        fs.mkdirSync(BASE_PATH + '/public' + pathToUpload)
      }

      const filePath = BASE_PATH + '/public' + pathToUpload + '/' + imageName

      file.mv(filePath, async (err) => {
        if (err) {
          console.error(`Error while moving file : ${err}`)
          throw {
            status: constants.INTERNAL_SERVER_ERROR,
            message: messages.FILE_UPLOAD_ERROR
          }
        }
      })
      return pathToUpload + '/' + imageName
    } catch (e) {
      throw e
    }
  },

  sendHtmlMail: (data, to, subject, templateUrl) => {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: env.EMAIL_FROM,
        pass: env.TEMP_PASSWORD
      }
    }, {from: env.EMAIL_SENDER_NAME + ' <' + env.EMAIL_FROM + '>'})

    module.exports.readHTMLFile(templateUrl)
      .then((html) => {
        var template = hbs.compile(html)
        var replacements = data
        var htmlToSend = template(replacements)

        var mailOptions = {
          to: to,
          subject: subject,
          html: htmlToSend // if you want to send html file
        }

        transporter.sendMail(mailOptions)
          .then((info) => {
            console.log('Email sent: ' + info.response)
          }).catch((e) => {
          console.log(`Errror in sendHtmlEmail : ${e}`)
        })
      }).catch((e) => {
      console.log(`Errror in sendHtmlEmail : ${e}`)
    })
  },

  readHTMLFile: async (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, {encoding: 'utf-8'}, (err, html) => {
        if (err) {
          reject(err)
        } else {
          resolve(html)
        }
      })
    })
  }
}
