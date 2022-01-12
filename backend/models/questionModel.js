import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, unique: true },
    answer: String,
    source: String,
    referenceUrl: String,
  },
  {
    timestamps: true,
  }
);

const QuestionModel = mongoose.model("Question ", questionSchema);

export default QuestionModel;
