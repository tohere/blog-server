const express = require('express') // 引入express
const router = express.Router() // 创建路由
const md5 = require('md5') // 对用户密码进行加密处理
const md5Key = 'WKu6%@u1B!GVKq2Y' // md5密钥

const secret = require('../config').keys // 引入密钥
const UserCtrl = require('../controllers/UserCtrl') // 引入用户相关控制器
const jwt = require('jsonwebtoken') // jwt用作token验证

/**
 * @desc 生成token
 * @param {Object} obj 要加密的数据
 * @param {String} obj.name 用户名
 * @param {String} obj.password 密码
 * @returns {String} 加密后的数据token 
 */
function createToken ({ username, password }) {
  return jwt.sign({
    username,
    password
  }, secret, {
    expiresIn: 60 * 60 //秒到期时间
  })
}

/**
 * @desc 登录接口
 */
router.post('/login', async (req, res) => {
  const userinfo = req.body
  // 获取token
  const token = req.headers['token'] || ''
  // 验证token
  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      const ret = await UserCtrl.findByName(userinfo.username)
      console.log(ret)
      // 如果ret存在，说明用户名存在，将密码加密之后和数据库中的进行比对
      if (!ret) {
        return res.json({ msg: '用户不存在！' })
      }
      userinfo.password = md5(userinfo.password + md5Key)
      if (ret.password === userinfo.password) {
        // 登录成功，生成token返回给前端
        const token = createToken(userinfo)
        return res.json({ msg: '登录成功', token })
      } else {
        return res.json({ mag: '用户名或密码错误！' })
      }
    }
    console.log(decoded)
    // 登录成功之后更新一下token
    return res.send({ msg: '登录成功!', token: createToken({username: decoded.username, password: decoded.password}) })
  })
})

exports.router = router
