const { Service } = require('../models/service.model.js')

const getAdminLogin = async (req, res) => {
  try {
    res.render('admin/login.ejs', {
      title: 'Admin Login',
      error: null,
    })
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}

const loginAdmin = async (req, res) => {
  try {
    const { passwords } = req.body

    if (!password) {
      return res.status(400).render('admin/login.ejs', {
        title: 'Admin Login',
        error: 'Please enter the admin password',
      })
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).render('admin/login.ejs', {
        title: 'Admin Login',
        error: 'Incorrect password',
      })
    }

    req.session.isAdmin = true

    res.redirect('/admin')
  } catch (error) {
    res.status(500).render('admin/login', {
      title: 'Admin Login',
      error: 'Something went wrong.',
    })
  }
}

const logoutAdmin = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send('Could not log out')
    }

    res.redirect('/admin/login')
  })
}

const getAdminDashboard = async (req, res) => {
  try {
    const services = await Service.find().sort({ name: 1 }).lean()

    res.render('admin/dashboard.ejs', {
      title: 'Admin Dashboard',
      services,
    })
  } catch (error) {
    res.status(500).render('admin/dashboard.ejs', {
      title: 'Admin Dashboard',
      services: [],
      error: 'Could not load dashboard',
    })
  }
}

const getNewServicePage = async (req, res) => {
  try {
    res.render('admin/new-service', {
      title: 'Add Service',
      error: null,
    })
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}

const createService = async (req, res) => {
  try {
    const { name, category, description, address, openingTimes } = req.body

    if (!name || !category || !description || !address || !openingTimes) {
      return res.status(400).render('admin/new-service', {
        title: 'Add Service',
        error: 'Please fill in all required fields',
      })
    }

    await Service.create(buildServiceData(req.body))

    res.redirect('/admin')
  } catch (error) {
    res.status(500).render('admin/new-service', {
      title: 'Add Service',
      error: 'Could not create service. Please try again.',
    })
  }
}

const getEditServicePage = async (req, res) => {
  try {
    const { id } = req.params

    const service = await Service.findById(id).lean()

    if (!service) {
      return res.status(404).send('Service not found')
    }

    res.render('admin/edit-service', {
      title: 'Edit Service',
      service,
      error: null,
    })
  } catch (error) {
    res.status(500).send('Could not load edit page')
  }
}

const updateService = async (req, res) => {
  try {
    const { id } = req.params
    const { name, category, description, address, openingTimes } = req.body

    if (!name || !category || !description || !address || !openingTimes) {
      const service = await Service.findById(id).lean()

      return res.status(400).render('admin/edit-service', {
        title: 'Edit Service',
        service,
        error: 'Please fill in all required fields',
      })
    }

    await Service.findByIdAndUpdate(id, buildServiceData(req.body), {
      runValidators: true,
    })

    res.redirect('/admin')
  } catch (error) {
    res.status(500).send('Could not update service')
  }
}

const deleteService = async (req, res) => {
  try {
    const { id } = req.params

    await Service.findByIdAndDelete(id)

    res.redirect('/admin')
  } catch (error) {
    res.status(500).send('Could not delete service')
  }
}

const buildServiceData = (body) => {
  return {
    name: body.name,
    category: body.category,
    description: body.description,
    address: body.address,
    phone: body.phone,
    openingTimes: body.openingTimes,

    isFree: body.isFree === 'on',
    hasWifi: body.hasWifi === 'on',
    hasPrinter: body.hasPrinter === 'on',
    hasToilets: body.hasToilets === 'on',
    hasStepFreeAccess: body.hasStepFreeAccess === 'on',

    accessibilityNotes: body.accessibilityNotes,
  }
}

module.exports = {
  getAdminLogin,
  loginAdmin,
  logoutAdmin,
  getAdminDashboard,
  getNewServicePage,
  createService,
  getEditServicePage,
  updateService,
  deleteService,
}
