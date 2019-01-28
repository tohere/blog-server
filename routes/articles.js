const express = require('express')
const router = express.Router()
const ArticleCtrl = require('../controllers/ArticleCtrl')
const multer = require('multer') // 处理图片上传

// 通过 filename 属性定制
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/images');    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + file.originalname // 通过时间戳保证相同的图片也能上传多次
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-19 22:55:30 
 * @Desc: 单图上传 
 */
router.post('/uploadimg', upload.single('file'), (req, res) => {
  const file = req.file.path.replace(/\\/g, '/')
  res.send({ url: 'http://localhost:3000/' + file})
})

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-20 19:29:17 
 * @Desc: 获取全部文章数据 
 */
router.get('/', (req, res) => {
  if (req.query.classify && req.query.classify !== '/') {
    // 通过分类名查询数据 
    ArticleCtrl.findByClassify(req.query.classify, req.query.page, (err, articles, count) => {
      if (err) {
        return res.json({ msg: 'get fail' })
      }
      res.json({ articles, count })
    })
    return
  }
  if (!req.query.id) {
    ArticleCtrl.getArticles(req.query.page, (err, ret, count) => {
      if (err) {
        return res.json({ msg: 'get fail' })
      }
      res.json({ articles: ret, count })
    })
    return
  }
  ArticleCtrl.getOneArticle(req.query.id, (err, article) => {
    if (err) {
      return res.json({msg: 'get fail'})
    }
    res.json({ article})
  })
})

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-20 17:03:33 
 * @Desc: 文章发布 
 */
router.post('/', (req, res) => {
  const articleInfos = req.body
  ArticleCtrl.postArticle(articleInfos.title, articleInfos.content, articleInfos.classify, (err, ret) => {
    if (err) {
      res.json({ msg: 'publish fail'})
    } else {
      res.json({msg: 'publish success'})
    }
  })
})

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-20 21:06:11 
 * @Desc: 增加浏览量 
 */
router.get('/addscan', (req, res) => {
  ArticleCtrl.addScan(req.query.id, (err, ret) => {
    if (err) {
      return res.json({msg: 'add scan fail'})
    }
    res.json({msg: 'add scan success'})
  })
})


/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-22 21:24:28 
 * @Desc: 模糊查询查询文章标题 
 */
router.get('/search', (req, res) => {
  ArticleCtrl.findTitle(req.query.txt, (err, ret) => {
    if (err) {
      return res.json({msg: 'search fail'})
    }
    res.json({ msg: 'search success', articles: ret })
  })
})

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-22 21:59:33 
 * @Desc: 删除某一篇文章 
 */
router.delete('/', (req, res) => {
  ArticleCtrl.delArticle(req.body.id, (err, ret) => {
    if (err) {
      return res.json({msg: 'delete fail'})
    }
    res.json({msg: 'delete success'})
  })
})

router.get('/times', (req, res) => {
  ArticleCtrl.findTimeArticles((err, ret) => {
    if (err) {
      return res.json({msg: 'find fail'})
    }
    res.json({msg: 'find success', articles: ret})
  })
})

module.exports = router
