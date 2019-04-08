const path = require('path');
const router = require('express').Router();
const protectedRoutes = require('./protected');
const authentication = require('../middleware/authentication');
const ctrl = require('../controller');

router.post('/auth', ctrl.users.create);
router.get('/auth', ctrl.users.logIn);
router.get('/', (req, res) => res.sendFile(path.join('/index.html')));
router.get('/login', (req, res) => res.redirect('/'));
router.get('/register', (req, res) => res.redirect('/'));
router.get('/dashboard/*', (req, res) => res.redirect('/'));

router.use(authentication, protectedRoutes);

module.exports = router;
