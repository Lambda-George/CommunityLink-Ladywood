const { Service } = require('../models/service.model.js')

const getHomePage = async (req, res) => {
  try {
    res.render('index', {
      title: 'CommunityLink Ladywood',
    })
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}

const getServices = async (req, res) => {
  try {
    const { search, category, free, wifi, printer, toilets, stepFree } =
      req.query

    const filter = {}

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ]
    }

    if (category) {
      filter.category = category
    }

    if (free === 'true') {
      filter.isFree = true
    }

    if (wifi === 'true') {
      filter.hasWifi = true
    }

    if (printer === 'true') {
      filter.hasPrinter = true
    }

    if (toilets === 'true') {
      filter.hasToilets = true
    }

    if (stepFree === 'true') {
      filter.hasStepFreeAccess = true
    }

    const services = await Service.find(filter).sort({ name: 1 }).lean()

    res.render('services', {
      title: 'Find Help',
      services,
      query: req.query,
      error: null,
    })
  } catch (error) {
    console.error(error)

    res.status(500).render('services', {
      title: 'Find Help',
      services: [],
      query: req.query,
      error: 'Could not load services.',
    })
  }
}

const getMapPage = async (req, res) => {
  try {
    const services = await Service.find({}).lean()
    res.render('map', {
      title: 'Map',
      services,
    })
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}

module.exports = {
  getHomePage,
  getServices,
  getMapPage,
}
