const Article = require('../models/Article')
const multer = require('multer') // 处理图片上传
const UserCtrl = require('./UserCtrl')
const tokenCtrl = require('../utils/token')

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-20 19:30:29 
 * @Desc: 所有文章查询获取 
 */
exports.getArticles = (callback) => {
  Article.find({}, (err, ret) => {
    callback(err, ret)
  })
}

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-20 20:05:35 
 * @Desc: 根据文章id查询某一篇文章 
 * @param {String} id 某一篇文章的id
 */
exports.getOneArticle = (id, callback) => {
  Article.findById(id, (err, ret) => {
    callback(err, ret)
  })
}

/**
 * @Desc 发布文章
 * @param {String} userId 用户id
 * @param {String} title 文章标题
 * @param {String} content 文章内容
 * @param {String} classify 文章分类
 */
exports.postArticle = (userId, title, content, classify, callback) => {
  const article = new Article({
    userId,
    title,
    content,
    classify
  }).save((error, ret) => {
    if (error) {
      return callback(error, null)
    }
    callback(null, ret)
  })
}

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-20 20:56:52 
 * @Desc: 浏览人数增加 
 */
exports.addScan = (id, callback) => {
  Article.findById(id, (err, ret) => {
    if (err) {
      return callback(err, ret)
    }
    let num = ++ret.scan
    Article.updateOne({ _id:id }, { scan: num }, (error, result) => {
      callback(error, result)
    })
  })
}

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-20 22:00:19 
 * @Desc: 通过分类名称查询数据 
 * @param {String} classify 分类名
 */
exports.findByClassify = (classify, callback) => {
  Article.find({classify}, (err, ret) => {
    callback(err, ret)
  })
}
