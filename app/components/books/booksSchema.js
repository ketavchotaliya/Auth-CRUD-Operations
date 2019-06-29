/* eslint-disable no-undef */

const Books = sequelizeObj.define('Books', {
  book_id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  author_name: Sequelize.STRING,
  description: {
    type: Sequelize.STRING,
    length: 500
  },
  photo: Sequelize.STRING,
  published_date: Sequelize.DATE,
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: 1
  },
  is_delete: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  },
  price: Sequelize.DECIMAL,
  isbn_number: {
    type: Sequelize.STRING,
    uniq: true
  }
}, {
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  tableName: 'books'
})

module.exports = Books
