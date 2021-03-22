const express = require('express');
const router = express.Router();

const usersApi = require('../../../controllers/api/v2/users_api');

router.get('/',usersApi.index);

module.exports = router;