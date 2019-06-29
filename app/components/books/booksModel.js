/* eslint-disable no-undef */

const bookSchema = require('./booksSchema')

module.exports = {
  findBookWithCriteria: async (criteriaObj) => {
    try {
      return await bookSchema.findOne({
        attributes: ['book_id', 'name', 'author_name', 'description', 'photo',
          'published_date', 'is_active', 'is_delete', 'price', 'isbn_number'],
        where: criteriaObj
      })
    } catch (e) {
      console.error(`Error in findBookWithISBN : ${e}`)
      throw e
    }
  },

  createBook: async (bookObj, transaction = null) => {
    try {
      if (transaction)
        return await bookSchema.create(bookObj, transaction)
      else
        return await bookSchema.create(bookObj)
    } catch (e) {
      console.error(`Error in createBook function :  ${e}`)
      throw e
    }
  },

  deleteBook: async (criteriaObj, transaction = null) => {
    try {
      if (transaction) {
        return await bookSchema.destroy({
          where: criteriaObj
        }, transaction)
      } else {
        return await bookSchema.destroy({
          where: criteriaObj
        })
      }
    } catch (e) {
      console.error(`Error in deleteBook function :  ${e}`)
      throw e
    }
  },

  updateBook: async (bookObj, criteriaObj, transaction = null) => {
    try {
      if (transaction)
        return await bookSchema.update(bookObj, {
          where: criteriaObj
        }, transaction)
      else
        return await bookSchema.update(bookObj, {criteriaObj})
    } catch (e) {
      console.error(`Error in updateBook function :  ${e}`)
      throw e
    }
  },
}
