const { default: mongoose } = require('mongoose')
const User = require('../models/User')
const Picture = require('../models/Picture')

const index = async (req, res) => {
    try {

        const users = await User.find();

        res.status(200).json(users)

    } catch(error) {
        res.status(500).json(error)
    }
}

const findById = async (req, res) => {
    try {

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: 'user not found'})
        }

        const user = await User.findOne({_id: id})

        const picture = await Picture.findOne({id_user: user.id}).select(['name', 'src'])
        
        const userWithPicture = {
            user,
            picture
        }

        return res.status(200).json(userWithPicture)

    } catch(error) {
        res.status(500).json(error)
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: 'user not found'})
        }

        await User.updateOne({_id: id}, {
            active: false
        })

        res.status(200).json({ message: 'User Deleted!' })
    } catch (error) {
        res.status(500).json({error})
    }
}

const update = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: 'user not found'})
        }

        const user = await User.findOne({_id: id})

        const updatedUser = {
            name: name || user.name,
            email: email || user.email,
            password: password || user.password
        }

        await User.updateOne({_id: id}, updatedUser)

        return res.status(200).json({message: 'user updated successfully!'})

    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    index,
    findById,
    remove,
    update
}