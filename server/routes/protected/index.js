const router = require('express').Router();
const usersRoutes = require('./users');
const languagesRoutes = require('./languages');
const proficienciesRoutes = require('./proficiencies');

router.use('/user', usersRoutes);
router.use('/languages', languagesRoutes);
router.use('/proficiencies', proficienciesRoutes);

module.exports = router;
