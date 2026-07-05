const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "AI Mock Interview",
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

    overallScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Interview", interviewSchema);
