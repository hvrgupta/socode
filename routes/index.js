const express = require('express');
const router = express.Router();
const passport  = require('passport');

const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.get('/about',homeController.about);

router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

router.use('/api',require('./api'));

// for any further routes, access from here
// router.use('/routerName',require('/routerFile'))

module.exports = router;