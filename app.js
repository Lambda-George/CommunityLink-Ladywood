const express = require('express')
const app = express()
const PORT = 5000

// small test
app.get('/', (req, res) => {
  res.status(200).render('test.ejs')
})

// 404
app.use((req, res) => {
  res.status(404).render('404.ejs')
})

// start server
try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
  })
} catch (error) {
  console.log('Startup failed', error)
}
