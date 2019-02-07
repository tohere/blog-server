## 项目中用到工具如下
- express
- mongoose // 操作数据库
- jsonwebtoken // 进行token加密处理
- body-parser // 处理post请求体传过来的数据
- md5 // 对用户密码进行加密处理
- multer // 处理图片上传


## 注意的地方
- 对时间进行加减通过下面的方式进行
> 参考https://blog.csdn.net/li_xiao_dai/article/details/20123173
```javascript
const date = new Date()
const day = date.setDate(date.getDate() - 3)
const year = date.setFullYear(date.getFullYear() - 1)
...
```
## mongoose中查询总数一些注意事项
- 要进行分页，需要总数和查询的分页数据，需要分两次进行查询
> 参考：http://cw.hubwiz.com/card/c/543b2f3cf86387171814c026/1/1/12/
**注意：分页page从0开始或者取page - 1**
```javascript
exports.findByClassify = (classify, page = 1, callback) => {
  Article.find({ classify })
    .skip((page - 1) * 10) // 此处page或者从0开始， 或者取page - 1
    .limit(10)
    .sort({ pubTime: -1 })
    .exec((err, ret) => {
      console.log(ret)
    callback(err, ret)
  })
}
```
## connect-history-api-fallback解决vue打包后页面刷新找不到的问题


