const router = require('express').Router()
const {index, findById, remove,update} = require('../controller/UserController')
const {verifyToken} = require('../middlewares/auth')

router.get('/', verifyToken, index)
router.get('/:id', verifyToken, findById)
router.delete('/:id', verifyToken, remove)
router.put('/:id', verifyToken, update)

module.exports = router

