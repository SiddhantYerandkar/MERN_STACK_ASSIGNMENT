const express = require('express')
const mongoose = require('mongoose')
const router = require('./route/route')

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://InternetThug:Siddhant123@cluster0.t0cdfcj.mongodb.net/MERN-STACK")
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))

app.use('/', router)

app.listen(3000, function () {
    console.log('Express app running on port' + ' ' + 3000)
});