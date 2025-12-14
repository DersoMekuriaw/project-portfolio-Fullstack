const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    description: String,
    price: Number,
    // ← Now only ONE image URL
    screenshot: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
