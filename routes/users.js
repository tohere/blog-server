const express = require('express') // 引入express
const router = express.Router() // 创建路由
const md5 = require('md5') // 对用户密码进行加密处理
const md5Key = 'WKu6%@u1B!GVKq2Y' // md5密钥

const UserCtrl = require('../controllers/UserCtrl') // 引入用户相关控制器
const tokenTool = require('../utils/token')

/**
 * @desc 登录接口
 */
router.post('/login', async (req, res) => {
  const userinfo = req.body
  // 获取token
  const token = req.headers['token'] || ''
  // 验证token
  tokenTool.verify(token, (err, decoded) => {
    if (err) {
      UserCtrl.findByName(userinfo.username, (err, user) => {
        // 如果ret存在，说明用户名存在，将密码加密之后和数据库中的进行比对
        if (err) {
          return res.json({ msg: '用户名或密码错误！' })
        }
        userinfo.password = md5(userinfo.password + md5Key)
        if (user[0].password === userinfo.password) {
          // 登录成功，生成token返回给前端
          const token = tokenTool.createToken({ id: user[0]._id, username: user[0].username })
          return res.json({ msg: '登录成功', token })
        } else {
          return res.json({ mag: '用户名或密码错误！' })
        }
      })
      return
    }
    return res.send({ msg: '登录成功!', token: tokenTool.createToken({ id: decoded.id, username: decoded.username }) })
  })
})

module.exports = router
