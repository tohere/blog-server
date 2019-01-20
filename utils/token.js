/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-19 22:03:20 
 * @Desc: token相关 
 */

const secret = require('../config').keys // 引入密钥
const jwt = require('jsonwebtoken') // jwt用作token验证
/**
 * @desc 生成token
 * @param {Object} obj 要加密的数据
 * @param {String} obj.id 用户id
 * @param {String} obj.name 用户名
 * @returns {String} 加密后的数据token 
 */
exports.createToken = ({ id, username }) => {
  return jwt.sign({
    id,
    username
  }, secret, {
      expiresIn: 60 * 60 //秒到期时间
    })
}

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-19 22:04:25 
 * @Desc: token验证 
 */
exports.verify = (token, callback) => {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, decoded)
  })
}
