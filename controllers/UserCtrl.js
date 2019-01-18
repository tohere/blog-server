const User = require('../models/User')

/**
 * @Desc 通过用户名查询数据库
 * @param {String} username 要查询的用户名
 * @returns {String | Object} err || user 返回null或者查询到的用户信息
 */
exports.findByName = async (username) => {
  return await User.findOne({ username }, (err, user) => {
    if (err) {
      return err
    }
    return user
  })
}
