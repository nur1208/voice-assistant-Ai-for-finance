import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    source: String,
    title: String,
    type: String,
    publishedAt: Date,
    imageUrl: String,
    description: String,
    goToUrl: String,
    publisher: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const NewsModel = mongoose.model("News", newsSchema);

export default NewsModel;
