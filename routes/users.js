const express = require('express') // 引入express
const router = express.Router() // 创建路由
const md5 = require('md5') // 对用户密码进行加密处理
const md5Key = 'Hbaxi9xWGZ06BI2SMid%EvxMU28Q9d&%r@aWgR9@3vNNpjdbJz5uDvljg5ziPLn7EDgiDKF9akpc84UR0' // md5密钥

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
        console.log(user)
        if (err) {
          return res.json({ status: 1, msg: '用户名或密码错误！' })
        }
        userinfo.password = md5(userinfo.password + md5Key)
        console.log(user)
        if (user.password === userinfo.password) {
          // 登录成功，生成token返回给前端
          const token = tokenTool.createToken({ id: user._id, username: user.username })
          return res.json({ status: 0, msg: '登录成功', token })
        } else {
          return res.json({ status: 1, msg: '用户名或密码错误！' })
        }
      })
      return
    }
    return res.send({ status: 0, msg: '登录成功!', token: tokenTool.createToken({ id: decoded.id, username: decoded.username }) })
  })
})

module.exports = router
