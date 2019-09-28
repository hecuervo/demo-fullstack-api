const router = require('express-promise-router')();
const DataBaseController = require('../controllers/data_base');
const auth = require('../middlewares/auth');

router.get('/', auth, DataBaseController.list);
router.get('/:id', auth, DataBaseController.getById);
router.post('/', auth, DataBaseController.add);
router.post('/upload', auth, DataBaseController.upload);
router.put('/:id', auth, DataBaseController.update);
router.delete('/:id', auth, DataBaseController.delete);

module.exports = router;