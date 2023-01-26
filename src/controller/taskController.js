const taskModel = require("../model/taskModel")
const { isValidString } = require("../validator/validator")

const createTask = async function (req, res) {
    try {
        const body = req.body
        const { Title, Description, Status } = body

        if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Body must not be empty" })

        if (!Title) return res.status(400).send({ status: false, message: "title is required" })
        if (!isValidString(Title)) return res.status(400).send({ status: false, message: "Enter a valid Title" })

        if (!Description) return res.status(400).send({ status: false, message: "Description is required" })
        if (!isValidString(Description)) return res.status(400).send({ status: false, message: "Enter a valid Description" })

        if (!Status) return res.status(400).send({ status: false, message: "Status is required" })
        let arr = ["Open", "In-Progress", "Completed"]
        if (!arr.includes(Status)) return res.status(400).send({ status: false, message: "Can only be from these: Open, In-Progress or Completed" })

        let dataCreated = await taskModel.create(body)
        return res.status(201).send({ status: true, Data: dataCreated })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const editTask = async function (req, res) {
    try {
        const body = req.body
        const { Title, Description, Status, id } = body

        if (Title) {
            if (!isValidString(Title)) return res.status(400).send({ status: false, message: "Enter a valid Title" })
        }
        if (Description) {
            if (!isValidString(Description)) return res.status(400).send({ status: false, message: "Enter a valid Description" })
        }
        if (Status) {
            let arr = ["Open", "In-Progress", "Completed"]
            if (!arr.includes(Status)) return res.status(400).send({ status: false, message: "Can only be from these: Open, In-Progress or Completed" })
        }
        const updateTask = await taskModel.findOneAndUpdate(
            { _id: id },
            {
                $set: body
            }, { new: true }
        )
        if (!updateTask) return res.status(404).send({ status: false, message: "task not found" })
        res.status(200).send({ status: true, message: "Success", data: updateTask })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getTask = async function (req, res) {
    try {
        let taskList = await taskModel.find()
        return res.status(200).send({ status: true, data: taskList })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createTask, editTask, getTask }