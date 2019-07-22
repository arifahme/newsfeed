const mongoose = require('mongoose')
const Schema = mongoose.Schema

function buildModel(name, schema) {
  return mongoose.model(name, new Schema(schema, {timestamps: true}))
}

// also contained "updatedAt" and "createdAt"
const Article = buildModel('Article', {
  source: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  urlToImage: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 1
  },
  topic: {
    type: String,
    default: "all"
  },
  content: {
    type: String,
    required: true
  },
  comment: {
    type: [Schema.Types.ObjectID],
    ref: "Article"
  }
})

module.exports = Article
