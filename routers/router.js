//External modules
const express = require('express')

//Local modules
const controller = require('../controllers/controller')

const router = express.Router()

router.get('/', controller.homeController)

router.get('/dashboard', controller.dashboardController)

router.get('/create', controller.createController)

router.post('/create', controller.createSubmitController)

router.get('/create-save', controller.createSaveController)

router.get('/publish', controller.publishController)

router.get('/unpublish', controller.unpublishController)

router.get('/remove', controller.removeController)

router.get('/view/:formId', controller.formViewController)

router.use('/submit', controller.submitController)

router.use(controller.pageNotFoundController)

module.exports = router