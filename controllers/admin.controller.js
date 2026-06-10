const { Service } = require('../models/service.model.js')

const getAdminLogin = async (req, res) => {
  try {
    res.render('admin/login', {
      title: 'Admin Login',
      error: null,
    })
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}

const loginAdmin = async (req, res) => {
  try {
    const { password } = req.body

    if (!password) {
      return res.status(400).render('admin/login', {
        title: 'Admin Login',
        error: 'Please enter the admin password',
      })
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).render('admin/login', {
        title: 'Admin Login',
        error: 'Incorrect password',
      })
    }

    req.session.isAdmin = true
    req.session.success = 'You have signed in successfully.'

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

    const success = req.session.success || null
    const error = req.session.error || null

    req.session.success = null
    req.session.error = null

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      services,
      success,
      error,
    })
  } catch (error) {
    console.error(error)

    res.status(500).render('admin/dashboard', {
      title: 'Admin Dashboard',
      services: [],
      success: null,
      error: 'Could not load dashboard.',
    })
  }
}

const createService = async (req, res) => {
  try {
    const { name, category, description, address, openingTimes } = req.body

    const phone = req.body.phone ? req.body.phone.trim() : ''

    const phoneRegex = /^[0-9\s()+-]*$/

    if (!name || !category || !description || !address || !openingTimes) {
      const services = await Service.find().sort({ name: 1 }).lean()

      return res.status(400).render('admin/dashboard', {
        title: 'Admin Dashboard',
        services,
        success: null,
        error: 'Please fill in all required fields.',
      })
    }

    if (phone && !phoneRegex.test(phone)) {
      const services = await Service.find().sort({ name: 1 }).lean()

      return res.status(400).render('admin/dashboard', {
        title: 'Admin Dashboard',
        services,
        success: null,
        error:
          'Phone number can only contain numbers, spaces, brackets, + or -.',
      })
    }

    await Service.create({
      name,
      category,
      description,
      address,
      phone,
      openingTimes,

      isFree: req.body.isFree === 'on',
      hasWifi: req.body.hasWifi === 'on',
      hasPrinter: req.body.hasPrinter === 'on',
      hasToilets: req.body.hasToilets === 'on',
      hasStepFreeAccess: req.body.hasStepFreeAccess === 'on',

      accessibilityNotes: req.body.accessibilityNotes,
    })

    req.session.success = `"${name}" has been added successfully.`

    res.redirect('/admin')
  } catch (error) {
    console.error(error)

    const services = await Service.find().sort({ name: 1 }).lean()

    res.status(500).render('admin/dashboard', {
      title: 'Admin Dashboard',
      services,
      success: null,
      error: 'Could not create service.',
    })
  }
}

const deleteService = async (req, res) => {
  try {
    const { id } = req.params

    const deletedService = await Service.findByIdAndDelete(id)

    if (!deletedService) {
      req.session.error = 'Service could not be found.'
      return res.redirect('/admin')
    }

    req.session.success = `"${deletedService.name}" has been deleted successfully.`

    res.redirect('/admin')
  } catch (error) {
    console.error(error)

    req.session.error = 'Could not delete service.'
    res.redirect('/admin')
  }
}

module.exports = {
  getAdminLogin,
  loginAdmin,
  logoutAdmin,
  getAdminDashboard,
  createService,
  deleteService,
}
