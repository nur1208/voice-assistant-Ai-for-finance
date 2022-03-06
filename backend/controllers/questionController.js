import QuestionModel from "../models/questionModel.js";

export const createQuestion = async (req, res) => {
  const { question, answer, source, referenceUrl } = req.body;
  const newQuestion = new QuestionModel({
    question,
    answer,
    source,
    referenceUrl,
  });

  const doc = await newQuestion.save();

  res.json({
    status: "success",
    message: "question added successfully",
    doc,
  });
};

export const getQuestions = async (req, res) => {
  console.log(req.query);

  const docs = await QuestionModel.find(req.query);

  console.log(docs);
  if (docs.length)
    res.json({
      status: "success",
      resultLength: docs.length,
      docs,
    });
  else
    res.status(404).json({
      status: "fall",
      message: `didn't find answer`,
    });
};
