const express = require('express')

const {
  getHomePage,
  getServices,
  getMapPage,
  getDigitalPage,
} = require('../controllers/public.controller.js')

const router = express.Router()

router.get('/', getHomePage)

router.get('/services', getServices)

router.get('/map', getMapPage)

router.get('/digital', getDigitalPage)

module.exports = router
