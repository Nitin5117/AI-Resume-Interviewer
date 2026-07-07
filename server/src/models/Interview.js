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
        question: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          default: "",
        },

        score: {
          type: Number,
          default: 0,
        },

        feedback: {
          type: String,
          default: "",
        },
      },
    ],

    status: {
      type: String,
      enum: [
        "pending",
        "started",
        "evaluating",
        "completed",
        "failed",
      ],
      default: "pending",
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    report: {
      summary: {
        type: String,
        default: "",
      },

      communication: {
        type: Number,
        default: 0,
      },

      technicalKnowledge: {
        type: Number,
        default: 0,
      },

      problemSolving: {
        type: Number,
        default: 0,
      },

      confidence: {
        type: Number,
        default: 0,
      },

      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      recommendations: {
        type: [String],
        default: [],
      },

      hiringDecision: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema,
);