const router = require('express').Router()
const {register,login} = require('../controller/AuthController')

router.post('/register', register)
router.post('/login', login)

module.exports = router

