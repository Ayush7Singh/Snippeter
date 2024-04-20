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
  createdAt : {
      type : Date,
      default : Date.now,
  }
})

module.exports = mongoose.model("Snippet",snippetSchema);