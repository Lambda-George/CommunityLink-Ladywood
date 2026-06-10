const express = require('express')

const {
  getHomePage,
  getServices,
  getMapPage,
  getDigitalPage,
  getFoodSupportPage,
  getCommunitiesPage,
  getWasteManagementPage,
  getEnergyPage
} = require('../controllers/public.controller.js')

const router = express.Router()

router.get('/', getHomePage)

router.get('/services', getServices)

router.get('/map', getMapPage)

router.get('/digital', getDigitalPage)

router.get('/food-support', getFoodSupportPage)

router.get('/communities', getCommunitiesPage)

router.get('/managing-waste', getWasteManagementPage)

router.get('/energy', getEnergyPage)

module.exports = router
