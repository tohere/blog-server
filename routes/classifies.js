const express = require('express')
const router = express.Router()
const Classify = require('../models/Classify')


/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-20 17:36:48 
 * @Desc: 获取分类 
 */
router.get('/', (req, res) => {
  Classify.find().then(classifies => res.json({ classifies }))
})

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-20 17:03:43 
 * @Desc: 添加分类 
 */
router.post('/', (req, res) => {
  console.log(req.body)
  new Classify({
    classify: req.body.cate
  }).save((err) => {
    console.log(err)
    if (err) {
      return res.json({ msg: 'add fail' })
    }
    res.json({ msg: 'add success' })
  })
})

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-21 21:37:25 
 * @Desc: 通过分类id删除分类 
 */
router.delete('/', (req, res) => {
  Classify.deleteOne({_id: req.body.id}, (err, ret) => {
    if (err) {
      return res.json({msg: 'delete fail', err})
    }
    res.json({msg: 'delete success'})
  })
})

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-21 22:27:19 
 * @Desc: 通过分类id修改分类 
 * @param {String} id 分类id
 */
router.put('/', (req, res) => {
  console.log(req.body)
  Classify.findOneAndUpdate({ _id: req.body.id }, { classify: req.body.cate }, (err, ret) => {
    console.log(err)
    if (err) {
      return res.json({ msg: 'update fail', err })
    }
    res.json({ msg: 'update success' })
  })
})

module.exports = router
