import express from 'express'
import './db/mongoose.js'
import User from './models/user.js'
 
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server is up on port ", port)
})

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(result =>{
        res.send(result)
    }).catch(error =>{
        res.status(400)
        res.send(error)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then(result =>{
        res.send(result)
    }).catch(error =>{
        res.status(400)
        res.send(error)
    })
})