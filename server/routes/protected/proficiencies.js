const router = require('express').Router();
const ctrl = require('../../controller');

router.get('/', ctrl.proficiencies.getAll);

module.exports = router;
