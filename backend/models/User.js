const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name : {
      type : String,
      require : [true,"Please enter your name"],
      maxLength : [35,"Cannt exceed 30 characters"],
      minLength : [5,"Cannt be less than 5 characters"]
  },
  email : {
      type : String,
      required : [true, "Please enter your email"],
      unique : true,
  },
  password : {
      type : String,
      required : [true,"Please enter a password"],
      minLength : [8,"Password should be 8 characters long"]
  },
  createdAt : {
      type : Date,
      default : Date.now,
  }
})

module.exports = mongoose.model("User",userSchema);