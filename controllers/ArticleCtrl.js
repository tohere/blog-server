const Article = require('../models/Article')
const multer = require('multer') // 处理图片上传
const UserCtrl = require('./UserCtrl')
const tokenCtrl = require('../utils/token')

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-20 19:30:29 
 * @Desc: 所有文章查询获取 并通过时间降序，并限制每页显示10条
 * @param {Number} page 当前页码
 */
// 注意：此处给自己挖了一个坑，page默认值应该从0开始或者取page - 1
exports.getArticles = (page = 1, callback) => {
  Article.find({})
    .skip((page - 1) * 10)
    .limit(10)
    .sort({ pubTime: -1 })
    .exec((err, ret, arr) => {
      Article.find()
        .countDocuments()
        .exec((err1, count) => {
          console.log(err, ret, count)
          callback(err, ret, count)
        })
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
 * @param {String} title 文章标题
 * @param {String} content 文章内容
 * @param {String} classify 文章分类
 */
exports.postArticle = (title, content, classify, callback) => {
  const article = new Article({
    title,
    content,
    classify
  }).save((error, ret) => {
    console.log(error, 'ret')
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
 * @Desc: 通过分类名称查询数据 并限制10条数据 按时间降序
 * @param {String} classify 分类名
 */
exports.findByClassify = (classify, page = 1, callback) => {
  Article.find({ classify })
    .skip((page - 1) * 10)
    .limit(10)
    .sort({ pubTime: -1 })
    .exec((err, ret) => {
      console.log(ret)
    callback(err, ret)
  })
}

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-22 21:25:44 
 * @Desc: 模糊查询文章标题 
 * @param {String} txt 要查询的文字
 */
exports.findTitle = (txt, callback) => {
  const searchReg = new RegExp(txt, 'i')
  Article.find({ title: searchReg}, (err, ret) => {
    callback(err, ret)
  })
}

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-22 21:59:49 
 * @Desc: 删除某一篇文章 
 * @param {String} id 文章id
 */
exports.delArticle = (id, callback) => {
  Article.findByIdAndDelete(id, (err, ret) => {
    callback(err, ret)
  })
}

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-23 21:10:36 
 * @Desc: 查询7天内的文章访问量 
 */
exports.findTimeArticles = (callback) => {
  const date = new Date()
  const old = date.setDate(date.getDate() - 7)
  console.log(old)
  Article.find({
    "pubTime": {
      $gte: old,
      $lte: Date.now()
    }
  }, (err, ret) => {
    callback(err, ret)
  })
}

