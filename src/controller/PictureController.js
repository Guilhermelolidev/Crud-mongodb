const Picture = require('../models/Picture')

const create = async (req, res) => {
   
    try {

        const {name, id_user} = req.body;
        
        const file = req.file;

        const picture = {
            name,
            src: file.path,
            id_user
        }

        await Picture.create(picture)

        return res.status(201).json({picture, message: "Image saved successfully"})

    } catch (error) {
        res.status(500).json(error)
    }

}

const remove = async(req, res) => {

    try {

        const {id} =  req.params;

        const picture = await Picture.findOne({_id: id})

        if(!picture) {
            return res.status(404).json({message: 'image not found'})
        }

        await Picture.deleteOne({_id: id})

        return res.status(200).json({message: 'picture removed'})

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    create,
    remove
};