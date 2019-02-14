const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  content: String,
  // 文章分类
  classify: {
    required: true,
    type: String
  },
  pubTime: {
    type: Date,
    default: Date // 此处用Date 或者 Date.now 不能用 new Date() 或者 Date.now() 如果用了new Date() 或者 Date.now() 在第一次调用的时候会自动执行，因此时间已经固定，而 Date 和 Date.now 是在调用的时候才会执行，因此获取的是当前时间
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
