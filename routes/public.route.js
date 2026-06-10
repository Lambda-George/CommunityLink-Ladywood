const express = require('express')

const {
  getHomePage,
  getServices,
  getMapPage,
<<<<<<< Updated upstream
   getFoodSupportPage,
   getCommunitiesPage,
=======
  getDigitalPage,
  getFoodSupportPage,
  getCommunitiesPage,
  getWasteManagementPage,
  getEnergyPage
>>>>>>> Stashed changes
} = require('../controllers/public.controller.js')

const router = express.Router()

router.get('/', getHomePage)

router.get('/services', getServices)

router.get('/map', getMapPage)

router.get('/food-support', getFoodSupportPage)

router.get('/communities', getCommunitiesPage)

router.get('/managing-waste', getWasteManagementPage)

router.get('/energy', getEnergyPage)

module.exports = router
