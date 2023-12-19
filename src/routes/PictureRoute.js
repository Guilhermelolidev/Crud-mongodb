const router = require('express').Router()
const {create, remove} = require('../controller/PictureController')

const upload = require('../config/multer')

router.post('/upload', upload.single('file'), create);
router.delete('/:id', remove);

module.exports = router;