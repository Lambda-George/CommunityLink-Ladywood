const express = require('express')
const router = express.Router()

router.get('/admin', (req, res) => {
  res.status(200).render('admin.ejs')
})

module.exports = router
