const express = require('express')

const {
  getAdminLogin,
  loginAdmin,
  logoutAdmin,
  getAdminDashboard,
  getNewServicePage,
  createService,
  getEditServicePage,
  updateService,
  deleteService,
} = require('../controllers/admin.controller.js')

const requireAdmin = require('../middleware/auth.middleware.js')

const router = express.Router()

router.get('/login', getAdminLogin)

router.post('/login', loginAdmin)

router.post('/logout', logoutAdmin)

router.get('/', requireAdmin, getAdminDashboard)

router.get('/services/new', requireAdmin, getNewServicePage)

router.post('/services', requireAdmin, createService)

router.get('/services/:id/edit', requireAdmin, getEditServicePage)

router.post('/services/:id/edit', requireAdmin, updateService)

router.post('/services/:id/delete', requireAdmin, deleteService)

module.exports = router
