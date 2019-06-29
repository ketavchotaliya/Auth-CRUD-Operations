'use strict'

const bookModel = require('./booksModel')
const bookSchema = require('./booksSchema')

module.exports = {
  /**
   * @typedef addBook
   * @property {string} name.required
   * @property {string} author_name.required
   * @property {string} description.required
   * @property {string} published_date.required
   * @property {string} price.required
   */
  /**
   * API for register a new user - sign up
   * @route POST /api/v1/books/
   * @group auth - APIs for Auth related operations
   * @param {addBook.model} addBook.body.required
   * @returns {object} 200 - Ok
   * @returns {object} 403 - Forbidden
   * @returns {object} 404 - Not Found
   * @returns {object} 422 - Unprocessable Entity
   * @returns {object} 500 - Internal server error
   *
   */
  addBook: async (req, res) => {
    try {
      let bookPhotoName = ''
      const {name, price, author_name, description, published_date, isbn_number} = req.body

      // find book with given isbn number is already store or not
      const findBook = await bookModel.findBookWithCriteria({isbn_number})

      if (findBook) {
        console.error(`Book with ISBN No. ${isbn_number} is already exists!`)
        helpers.createResponse(res, constants.UNPROCESSED,
          messages.MODULE_EXISTS('Book'), {})
        return
      }

      if (req.files && req.files.photo) {
        try {
          await helpers.validateImage(req.files.photo)

          bookPhotoName = await helpers.uploadFile(req.files.photo, '/images/books')
        } catch (e) {
          console.log(`Error in validating Image : ${e}`)
          helpers.createResponse(res, e.status,
            e.message, {})
          return
        }
      }

      const bookObj = {
        name,
        price,
        author_name,
        description,
        published_date,
        isbn_number,
        photo: bookPhotoName
      }

      const createBook = await bookModel.createBook(bookObj)

      if (createBook.dataValues.is_delete)
        delete createBook.dataValues.is_delete
      if (createBook.dataValues.is_active)
        delete createBook.dataValues.is_delete

      // create URL for book photo
      createBook.photo = `http://${env.HOST_NAME}:${env.PORT}${createBook.photo}`

      helpers.createResponse(res, constants.SUCCESS,
        messages.MODULE_STORE_SUCCESS('Book'), {
          data: createBook
        })

    } catch (e) {
      console.error(__filename, 'addBook', e.stack)
      helpers.createResponse(res, constants.INTERNAL_SERVER_ERROR,
        messages.SERVER_ERROR_MESSAGE, {})
      return
    }
  },

  deleteBook: async (req, res) => {
    try {
      const {book_id} = req.body

      // check book exists or not
      const findBook = await bookModel.findBookWithCriteria({book_id})

      if (!findBook) {
        console.error(`Book with ID No. ${book_id} is not exists!`)
        helpers.createResponse(res, constants.NOT_FOUND,
          messages.MODULE_NOT_FOUND('Book'), {})
        return
      }

      // delete the book
      await bookModel.deleteBook({book_id})

      helpers.createResponse(res, constants.SUCCESS,
        messages.MODULE_DELETE_SUCCESS('Book'))

    } catch (e) {
      console.error(__filename, 'deleteBook', e.stack)
      helpers.createResponse(res, constants.INTERNAL_SERVER_ERROR,
        messages.SERVER_ERROR_MESSAGE, {})
      return
    }
  },

  bookDetail: async (req, res) => {
    try {
      const {book_id} = req.params

      // check book exists or not
      const findBook = await bookModel.findBookWithCriteria({book_id})

      if (!findBook) {
        console.error(`Book with ID No. ${book_id} is not exists!`)
        helpers.createResponse(res, constants.NOT_FOUND,
          messages.MODULE_NOT_FOUND('Book'), {})
        return
      }

      if (findBook.dataValues.is_delete)
        delete findBook.dataValues.is_delete
      if (findBook.dataValues.is_active)
        delete findBook.dataValues.is_active

      // create URL for book photo
      findBook.photo = `http://${env.HOST_NAME}:${env.PORT}${findBook.photo}`

      helpers.createResponse(res, constants.SUCCESS,
        messages.MODULE_FOUND('Book'), {
          data: findBook
        })

    } catch (e) {
      console.error(__filename, 'deleteBook', e.stack)
      helpers.createResponse(res, constants.INTERNAL_SERVER_ERROR,
        messages.SERVER_ERROR_MESSAGE, {})
      return
    }
  },

  bookList: async (req, res) => {
    try {
      let bookSearchData = {}
      let sortBy = helpers.getSortBy_New(req)
      let sortOrder = helpers.getSortOrder_New(req)
      let orderBy = [[constants.SORT_BY, sortOrder]]

      var allowFields = ['book_id', 'name', 'author_name', 'description',
        'published_date', 'is_active', 'price', 'isbn_number'
      ]

      if (typeof req.body.search !== 'undefined') {
        var search = JSON.parse(req.body.search)
        for (var key in search) {
          if (allowFields.includes(key)) {
            if (['book_id', 'is_active', 'price'].includes(key)) {
              bookSearchData[key] = search[key]
            } else {
              bookSearchData[key] = {[Op.like]: '%' + search[key] + '%'}
            }
          }
        }
      }

      // pagination paramter
      let pageNumber = parseInt(helpers.getPageNumber(req))
      let recordsPerPage = parseInt(helpers.getRecordsPerPage(req))
      let skip = ( pageNumber - 1 ) * recordsPerPage

      let booksList = await bookSchema.findAndCountAll({
        where: bookSearchData,
        offset: skip,
        limit: recordsPerPage,
        order: orderBy,
        attributes: ['book_id', 'name', 'author_name', 'description',
          'published_date', 'price', 'isbn_number']
      })

      let pager = {
        sortBy, sortOrder, pageNumber, recordsPerPage,
        'filteredRecords': booksList.rows.length,
        'totalRecords': booksList.count
      }

      console.info(__filename, 'index', 'Books list found!')
      helpers.createResponse(res, constants.SUCCESS,
        messages.MODULE_LIST_SUCCESS('Books'),
        {'data': booksList.rows}, pager
      )
    } catch (e) {
      console.error(__filename, 'bookList', e.stack)
      helpers.createResponse(res, constants.INTERNAL_SERVER_ERROR,
        messages.SERVER_ERROR_MESSAGE, {})
      return
    }
  }
}
