import mongoose, { Schema } from "mongoose";

const exampleSchema = new Schema(
  {
    example: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Example = mongoose.model("Example", exampleSchema);
