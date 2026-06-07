const express = require('express')

const {
  getAdminLogin,
  loginAdmin,
  logoutAdmin,
  getAdminDashboard,
  createService,
  deleteService,
} = require('../controllers/admin.controller.js')

const requireAdmin = require('../middleware/auth.middleware.js')

const router = express.Router()

router.get('/login', getAdminLogin)
router.post('/login', loginAdmin)
router.post('/logout', logoutAdmin)

router.get('/', requireAdmin, getAdminDashboard)
router.post('/services', requireAdmin, createService)
router.post('/services/:id/delete', requireAdmin, deleteService)

module.exports = router
