const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
  userId: String,
  title: {
    required: true,
    type: String
  },
  content: {
    required: true,
    type: String
  },
  // 文章分类
  classify: {
    required: true,
    type: String
  },
  pubTime: {
    type: Date,
    default: new Date()
  },
  // 点赞数
  praise: {
    type: Number,
    default: 0
  },
  // 浏览数
  scan: {
    type: Number,
    default: 0
  }
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
