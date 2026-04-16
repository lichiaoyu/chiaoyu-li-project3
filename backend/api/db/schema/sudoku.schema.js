import mongoose from "mongoose";

const sudokuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["EASY", "NORMAL"],
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    puzzle: {
      type: [[Number]],
      required: true,
    },
    solution: {
      type: [[Number]],
      required: true,
    },
    currentState: {
      type: [[Number]],
      required: true,
    },
    completedBy: {
      type: [String],
      default: [],
    },
    highScores: {
      type: [
        {
          username: {
            type: String,
            required: true,
          },
          timeMs: {
            type: Number,
            required: true,
            min: 0,
          },
        },
      ],
      default: [],
    },
    progressByUser: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: "sudokus",
  }
);

export default sudokuSchema;
