const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

const authMiddleware = require('../middleware/auth')

//every time anybody is trying to access to this route, they will go through the middleware, and  since I have next() in the middleware (in auth.js)- i´ll pass  to the next fn- dashboard in this case
router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/login').post(login);

module.exports = router;
