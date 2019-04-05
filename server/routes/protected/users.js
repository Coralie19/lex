const router = require('express').Router();
const multer = require('multer');
const ctrl = require('../../controller');

const upload = multer({ dest: 'uploads/' });

router.get('/', ctrl.users.getAll);

router.get('/matches', ctrl.users.getMatches);

router.put('/', ctrl.users.editUser);

router.get('/me', ctrl.users.getMe);

router.post('/photo', upload.single('profilePhoto'), ctrl.users.uploadPhoto);

module.exports = router;
