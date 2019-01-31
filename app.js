const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') // 处理post请求体
const users = require('./routes/users') // 引入用户相关中间件
const articles = require('./routes/articles') // 引入文章相关中间件
const classifies = require('./routes/classifies') // 引入分类相关

// 处理vue打包后刷新路径错误的问题
const history = require('connect-history-api-fallback')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/myBlog', { useNewUrlParser: true })
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
// app.all('*', function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*")
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With")
  //   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  //   res.header("X-Powered-By", ' 3.2.1')
  //   res.header("Content-Type", "application/json;charset=utf-8")
  //   next()
  // })

app.use('/', history())
  
app.use(express.static(path.join(__dirname, 'dist')))


// app.use('/', (req, res) => {
//   res.render('index.html')
// })

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-19 23:30:36 
 * @Desc: 开放static目录 
 */
app.use('/static', express.static(path.join(__dirname, 'static')))

// app.use((req, res, next) => {
//   console.log(req.url)
//   if (req.url.includes('users')) {
//     console.log('ok')
//   }
// })

/**
 * 处理用户相关逻辑
 */
app.use('/users', users)

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-19 21:55:16 
 * @Desc: 文章相关中间件 
 */
app.use('/articles', articles)

/** 
 * @Author: tomorrow-here 
 * @Date: 2019-01-21 21:08:06 
 * @Desc: 处理分类相关 
 */
app.use('/classifies', classifies)

app.listen(3000, () => {
  console.log('服务启动成功')
})
