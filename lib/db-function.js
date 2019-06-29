/* eslint-disable no-undef */
'use strict'

module.exports = {
  /**
   * Call DB Procedure / Function / Query
   *
   * @param {string} dbQuery - sql query
   * @param {array} paramsArr - array of params
   * @param {string} paramKey - param key name
   * @param {object} transaction - transaction object
   * @param {string} queryType - query type i.e. select, udate, insert, delete
   *
   * @return {Promise<*>}
   */
  dbQuery: async (dbQuery, paramsArr = [], paramKey = '', transaction = null, queryType = '') => {
    return new Promise(async (resolve, reject) => {
      try {
        // reject if dbQuery (function name or SQL query) is empty
        if (typeof dbQuery === 'undefined' || dbQuery === null) {
          reject(new Error('dbQuery could not be empty'))
        } else {
          let results = null
          let queryArguments = {}

          if (paramsArr.length > 0) {
            queryArguments.replacements = paramsArr
            if (paramKey !== '') {
              queryArguments.replacements = { [ paramKey ]: paramsArr }
            }
          }

          if (transaction !== null) {
            queryArguments.transaction = transaction
          }

          if (queryType.toLowerCase() === 'select') {
            queryArguments.type = sequelizeObj.QueryTypes.SELECT
          } else if (queryType.toLowerCase() === 'insert') {
            queryArguments.type = sequelizeObj.QueryTypes.INSERT
          } else if (queryType.toLowerCase() === 'update') {
            queryArguments.type = sequelizeObj.QueryTypes.UPDATE
          } else if (queryType.toLowerCase() === 'delete') {
            queryArguments.type = sequelizeObj.QueryTypes.DELETE
          }

          results = await sequelizeObj.query(dbQuery, queryArguments)

          if (transaction !== null) {
            queryArguments.transaction = 'transaction'
          }
          console.debug(__filename, 'dbQuery', 'dbQuery==========>', dbQuery)
          console.debug(__filename, 'dbQuery', 'queryArguments========>', queryArguments)

          resolve(results)
        }
      } catch (err) {
        console.error(__filename, 'dbQuery', 'Error during Call DB Procedure / Function', err)
        reject(err)
      }
    })
  },

  dbSearch: async (criteria, criteriaOperator, tableAlias) => {
    try {
      let tableAliasKeys = helpers.getObjectKeys(tableAlias)
      criteriaOperator = (criteriaOperator || constants.CRITERIA_OPERATOR)
      let colName
      let sqlQuery = ''
      let criteriaArr = (criteria || [])
      let isKeyMismatch = false

      if (criteriaArr.length <= 0) {
        throw new Error('search criteria is missing!')
      }

      for (let i = 0; i < criteriaArr.length; i++) {
        let properties = helpers.getObjectKeys(criteriaArr[ i ])
        if (!properties.includes('column') ||
          !properties.includes('operator') ||
          !properties.includes('values')
        ) {
          isKeyMismatch = true
          break
        }
      }

      if (isKeyMismatch === false) {
        for (let i = 0; i < criteriaArr.length; i++) {
          if (!tableAliasKeys.includes(criteriaArr[ i ].column)) {
            isKeyMismatch = true
            break
          } else {
            // find original column name from table alias object
            colName = tableAlias[ criteriaArr[ i ].column ]
            // prepare sql statement
            sqlQuery += await module.exports.operatorEnum(
              criteriaArr[ i ].operator, colName, criteriaArr[ i ].values[ 0 ]
            )

            if (i < (criteriaArr.length - 1)) {
              sqlQuery += await module.exports.criteriaOperatorEnum(
                criteriaOperator
              )
            }
          }
        }
      }

      if (isKeyMismatch === true) {
        console.error(__filename, 'dbSearch', '', 'Key mismatch in criteria array!')
        throw new Error('Key mismatch in criteria array!')
      }

      return sqlQuery
    } catch (error) {
      console.error(__filename, 'dbSearch', '', 'Error in dbSearch function : ', JSON.stringify(error.stack))
      // reject(error);
      throw error
    }
  },

  // operator enum
  operatorEnum: async (operator, colName, value) => {
    try {
      let lastChar
      let valueData = value
      operator = operator.toLowerCase()
      switch (operator) {
        case 'like':
          return ' ' + colName + ' LIKE \'%' + valueData + '%\' '
          break
        case 'notlike':
        case '!like':
          return ' ' + colName + ' NOT LIKE \'%' + valueData + '%\' '
          break
        case 'equals':
        case '=':
          return ' ' + colName + '= "' + valueData + '" '
          break
        case 'notequals':
        case '!=':
          return ' ' + colName + '!= "' + valueData + '" '
          break
        case 'null':
          return ' ' + colName + ' IS NULL'
          break
        case 'notnull':
        case '!null':
          return ' ' + colName + ' IS NOT NULL'
          break
        case 'in':
          if (typeof valueData === 'string') {
            valueData = valueData.trim()
            lastChar = valueData[ valueData.length - 1 ]
            // remove extra comma from string
            if (lastChar === ',') {
              valueData = valueData.slice(0, -1)
            }
          }
          return ' ' + colName + ' IN (' + valueData + ')'
          break
        case 'notin':
        case '!in':
          if (typeof valueData === 'string') {
            valueData = valueData.trim()
            lastChar = valueData[ valueData.length - 1 ]
            // remove extra comma from string
            if (lastChar === ',') {
              valueData = valueData.slice(0, -1)
            }
          }
          return ' ' + colName + ' NOT IN (' + valueData + ')'
          break
        case 'true':
          return ' ' + colName + ' = ' + true
          break
        case 'false':
          return ' ' + colName + ' = ' + false
          break
        case 'greaterthan':
        case '>':
          return ' ' + colName + ' >  "' + valueData + '"'
          break
        case 'lessthan':
        case '<':
          return ' ' + colName + ' <  "' + valueData + '"'
          break
        case 'greaterthanorequal':
        case '>=':
          return ' ' + colName + ' >=  "' + valueData + '"'
          break
        case 'lessthanorequal':
        case '<=':
          return ' ' + colName + ' <=  "' + value + '"'
          break
        default:
          throw new Error('Invalid Operator!')
          break
      }
    } catch (err) {
      console.error(__filename, 'operatorEnum', '', 'Error in operatorEnum function:', JSON.stringify(err.stack))
      throw err
    }
  },

  // criteriaOperator enum
  criteriaOperatorEnum: async (operator) => {
    try {
      operator = operator.toLowerCase()
      switch (operator) {
        case 'and':
          return ' AND '
          break
        case 'or':
          return ' OR '
          break
        default:
          throw new Error('Invalid Criteria Operator!')
          break
      }
    } catch (err) {
      console.error(__filename, 'criteriaOperatorEnum', '', 'Error in criteriaOperatorEnum function:', JSON.stringify(err.stack))
      throw err
    }
  }
}
