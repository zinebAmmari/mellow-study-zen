const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
