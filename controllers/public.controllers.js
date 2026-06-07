const { Service } = require('../models/service.model.js')

const getHomePage = (req, res) => {
  res.render('index.ejs', {
    title: 'CommunityLink Ladywood',
  })
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
    })
  } catch (error) {
    res.status(500).render('services', {
      title: 'Find Help',
      services: [],
      query: req.query,
      error: 'Could not load services.',
    })
  }
}

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params

    const service = await Service.findById(id).lean()

    if (!service) {
      return res.status(404).send('Service not found')
    }

    res.render('service-details', {
      title: service.name,
      service,
    })
  } catch (error) {
    res.status(500).send('Could not load service')
  }
}

module.exports = {
  getHomePage,
  getServices,
  getServiceById,
}
