const express = require('express')

const {
  getHomePage,
  getServices,
} = require('../controllers/public.controller.js')

const router = express.Router()

router.get('/', getHomePage)

router.get('/services', getServices)

module.exports = router
