const mongoose = require('mongoose');
const snippetSchema = new mongoose.Schema({
  name : {
      type : String,
      require : [true],
  },
  lan : {
      type : String,
      required : [true]
  },
  code : {
      type : String,
      required : [true]
  },
  shareCount : {
    type : Number,
    default : 0
  },
  user : {
    type : mongoose.Schema.ObjectId,
    ref : "User",
    required : true,
  },
  createdAt : {
      type : Date,
      default : Date.now,
  }
})

module.exports = mongoose.model("Snippet",snippetSchema);