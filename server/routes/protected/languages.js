const router = require('express').Router();
const ctrl = require('../../controller');

router.get('/', ctrl.languages.getAll);

module.exports = router;
