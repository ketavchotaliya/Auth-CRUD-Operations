'use strict'

const express = require('express')
var router = express.Router()

// health check
router.get('/health', (req, res, next) => {
  res.status(200).json({ success: true })
})

module.exports = router
