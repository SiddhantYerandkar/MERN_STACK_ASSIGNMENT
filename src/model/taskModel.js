const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true,
        enum: ["Open", "In-Progress", "Completed"]
    },
    DateTime: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Task", taskSchema);