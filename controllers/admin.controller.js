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

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      services,
      error: null,
    })
  } catch (error) {
    res.status(500).render('admin/dashboard', {
      title: 'Admin Dashboard',
      services: [],
      error: 'Could not load dashboard',
    })
  }
}

const createService = async (req, res) => {
  try {
    const { name, category, description, address, openingTimes } = req.body

    if (!name || !category || !description || !address || !openingTimes) {
      const services = await Service.find().sort({ name: 1 }).lean()

      return res.status(400).render('admin/dashboard', {
        title: 'Admin Dashboard',
        services,
        error: 'Please fill in all required fields',
      })
    }

    await Service.create({
      name,
      category,
      description,
      address,
      phone: req.body.phone,
      openingTimes,
      isFree: req.body.isFree === 'on',
      hasWifi: req.body.hasWifi === 'on',
      hasPrinter: req.body.hasPrinter === 'on',
      hasToilets: req.body.hasToilets === 'on',
      hasStepFreeAccess: req.body.hasStepFreeAccess === 'on',
      accessibilityNotes: req.body.accessibilityNotes,
    })

    res.redirect('/admin')
  } catch (error) {
    const services = await Service.find().sort({ name: 1 }).lean()

    res.status(500).render('admin/dashboard', {
      title: 'Admin Dashboard',
      services,
      error: 'Could not create service.',
    })
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

module.exports = {
  getAdminLogin,
  loginAdmin,
  logoutAdmin,
  getAdminDashboard,
  createService,
  deleteService,
}
