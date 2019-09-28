const router = require('express-promise-router')();
const UserController = require('../controllers/user');

const auth = require('../middlewares/auth');


router.get('/', auth, UserController.list);
router.get('/:id', auth, UserController.getById);
router.post('/', UserController.add);
router.put('/:id', auth, UserController.update);
router.delete('/:id', auth, UserController.delete);
router.post('/login', UserController.login);

module.exports = router;