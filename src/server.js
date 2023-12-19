require("dotenv").config();
const express = require("express")
const mongoose = require('mongoose')
const app = express() 

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

const userRouter = require('./routes/UserRoute')
const authRouter = require('./routes/AuthRoute')
const pictureRouter = require('./routes/PictureRoute')

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/picture', pictureRouter)

const PORT = 3000

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.a0k5pwz.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('Connect to mongoose!')

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})
.catch((err) => console.log(err))

