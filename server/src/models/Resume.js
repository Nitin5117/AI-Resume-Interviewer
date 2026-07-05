const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileName: String,

    filePath: String,

    fileSize: Number,

    extractedText: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["uploaded", "analyzing", "completed", "failed"],
      default: "uploaded",
    },

    analysis: {
      resumeScore: {
        type: Number,
        default: 0,
      },

      atsScore: {
        type: Number,
        default: 0,
      },

      strengths: [String],

      missingSkills: [String],

      suggestions: [
        {
          title: {
            type: String,
            required: true,
          },

          description: {
            type: String,
            required: true,
          },

          priority: {
            type: String,
            enum: ["High", "Medium", "Low"],
            default: "Medium",
          },
        },
      ],

      detectedSkills: [String],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Resume", resumeSchema);
