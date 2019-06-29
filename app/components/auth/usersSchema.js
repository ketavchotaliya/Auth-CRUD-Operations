/* eslint-disable no-undef */

const Users = sequelizeObj.define('Users', {
  user_id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    nullable: false
  },
  password: Sequelize.STRING,
  dob: Sequelize.DATE,
  photo: Sequelize.STRING,
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
  forgot_password_otp: Sequelize.STRING
}, {
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  tableName: 'users'
})

module.exports = Users
