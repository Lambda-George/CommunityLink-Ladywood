const express = require('express')

const {
  getHomePage,
  getServices,
  getServiceById,
} = require('../controllers/public.controllers.js')

const router = express.Router()

router.get('/', getHomePage)
router.get('/services', getServices)
router.get('/services/:id', getServiceById)

module.exports = router
