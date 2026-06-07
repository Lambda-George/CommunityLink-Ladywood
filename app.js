const express = require('express')
const app = express()

require('dotenv').config()
// const dotenv = require('dotenv')
const session = require('express-session')
const path = require('path')
const PORT = process.env.PORT || 3002

// dotenv.config({
//   path: './.env',
// })

// database
const connectDB = require('./config/database.js')
connectDB()

// routes
const publicRoutes = require('./routes/public.route.js')
const adminRoutes = require('./routes/admin.route.js')

// ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'temporary_secret',
    resave: false,
    saveUninitialized: false,
  }),
)

app.use((req, res, next) => {
  res.locals.isAdmin = req.session.isAdmin || false
  next()
})

// small test
// app.get('/', (req, res) => {
//   res.status(200).render('test.ejs')
// })

//
app.use('/', publicRoutes)
app.use('/admin', adminRoutes)

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
