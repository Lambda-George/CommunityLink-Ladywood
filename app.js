const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config({
  path: './.env',
})

// routes
const publicRoutes = require('./routes/public.route.js')

// ejs
app.set('view engine', 'ejs')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

// small test
app.get('/', (req, res) => {
  res.status(200).render('test.ejs')
})

//
app.use('/', publicRoutes)

// 404
app.use((req, res) => {
  res.status(404).render('404.ejs')
})

// start server
try {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`)
  })
} catch (error) {
  console.log('Startup failed', error)
}

// list
/*
  Mongodb
  Homepage
  Events
  

*/
