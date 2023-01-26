const express = require('express')
const router = express.Router()
const { createTask, editTask, getTask } = require("../controller/taskController")


router.post('/createtask', createTask)

router.put('/edittask', editTask)

router.get('/gettask', getTask)

module.exports = router