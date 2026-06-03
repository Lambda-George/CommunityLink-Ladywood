const express = require('express')
const router = express.Router()

router.get('/home', (req, res) => {
  res.status(200).render('homepage.ejs')
})

module.exports = router
