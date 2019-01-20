// 文章分类model
const mongoose = require('mongoose')
const ClassfySchema = new mongoose.Schema({
  classify: {
    required: true,
    type: String
  }
})

const Classify = mongoose.model('Classify', ClassfySchema)
module.exports = Classify
