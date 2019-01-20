const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  loginDate: {
    type: Date,
    default: new Date()
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User // User是一个对象
