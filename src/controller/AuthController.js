const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({message: 'email not found'})
        }

        const passwordIsValid = await bcrypt.compare(password, user.password)

        if(!passwordIsValid) {
            return res.status(422).json({message: 'invalid password'})
        }

        const secret = process.env.secret

        const token = jwt.sign({id: user.id}, secret)

        return res.status(422).json({ message: 'Authentication success', token })

    } catch (error){
        res.status(500).json({error})
    }
}

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body

        const user = await User.findOne({email})

        if(user) {
            return res.status(400).json({ message: 'Email already exists!' })
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = {
            email,
            name,
            password: passwordHash,
            active: true
        }

        await User.create(newUser)

        return res.status(201).json({ message: 'User created!' })
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    register,
    login
}