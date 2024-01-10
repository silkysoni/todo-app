const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/schema')


//**MUST  middleware to parse the incoming request body. This is required to access the req.body property in your POST route.
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// to connect frontend and backend
const cors = require('cors')
app.use(cors({
    origin: "http://localhost:4200"
    // origin: "http://localhost:60347"
}))


//connected db with app.js
const db = require('./connection/conn')
// db();

app.get('/', (req, res) => {
    try {
        User.find({}).then((enteries) => {
            res.send({ success: true, data: enteries })
        })

    } catch (err) {
        res.send({ success: false, message: 'Internal error ' })
    }
})

app.post('/user', async (req, res) => {
    try {
        // res.send('Post')
        let userTask = req.body.task
        const list = new User({
            task: userTask
        })
        const saveList = await list.save()
        res.status(200).json({ success: true, message: "Data saved", data: saveList })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Data not saved due to internal error" })
    }
})

app.patch("/:id/edit", async (req, res) => {
    try {
        const ID = req.params.id
        const newTask = req.body.task
        await User.findByIdAndUpdate(ID, {
            task: newTask
        })
        res.json({ sucess: true, message: "Task updated Successfully!" })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Not edit due to internal error" })
    }
})

app.delete('/:id/delete', (req, res) => {
    User.findByIdAndDelete({
        _id: req.params.id
    }).then((removedData) => {
        res.send(removedData)
    })
})

app.listen(3000, () => {
    console.log("Port 3000");
})