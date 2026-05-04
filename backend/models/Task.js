const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    staffName: { type: String, required: true },
    task: { type: String, required: true },
    status: { type: String, default: "Pending" },
    dateTime: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);