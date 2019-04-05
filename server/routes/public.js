const path = require('path');
const router = require('express').Router();
const protectedRoutes = require('./protected');
const authentication = require('../middleware/authentication');
const ctrl = require('../controller');

router.post('/register', ctrl.users.create);
router.get('/login', ctrl.users.logIn);
router.get('/', (req, res) => res.sendFile(path.join('/index.html')));

router.use(authentication, protectedRoutes);

module.exports = router;
