const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser') // 处理post请求体
const users = require('./routes/users') // 引入用户相关中间件

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 连接数据库
const db = mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true })
// 连接失败
mongoose.connection.on('error', (err) => {
  console.log('数据库连接失败' + err)
})
// 连接成功
mongoose.connection.on('connected', () => {
  console.log('数据库连接成功')
})
// 连接断开
mongoose.connection.on('disconnected', () => {
  console.log('数据库连接断开')
})

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})
/**
 * 处理用户相关逻辑
 */
app.use('/user', users.router)

app.listen(3000, () => {
  console.log('服务启动成功')
})
