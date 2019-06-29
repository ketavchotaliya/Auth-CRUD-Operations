/* eslint-disable no-undef */
const usersSchema = require('./usersSchema')

const UserSession = sequelizeObj.define('UserSession', {
  user_id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  session_id: {
    type: Sequelize.STRING,
    nullable: false
  },
  session_timeout: Sequelize.INTEGER,
  stay_logged_in: Sequelize.TINYINT,
  login_date: Sequelize.DATE,
  logout_date: Sequelize.DATE,
  is_active: {
    type: Sequelize.BOOLEAN, defaultValue: 1
  },
  device_type: Sequelize.TINYINT
}, {
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  tableName: 'user_sessions'
})

UserSession.belongsTo(usersSchema, {
  as: 'users',
  foreignKey: 'user_id',
  targetKey: 'user_id'
})

module.exports = UserSession
