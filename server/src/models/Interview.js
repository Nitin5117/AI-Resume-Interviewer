const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    questions: [
      {
        question: String,
        answer: {
          type: String,
          default: "",
        },
        feedback: {
          type: String,
          default: "",
        },
        score: {
          type: Number,
          default: 0,
        },
      },
    ],

    status: {
      type: String,
      enum: ["pending", "started", "completed"],
      default: "pending",
    },

    overallScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Interview", interviewSchema);
