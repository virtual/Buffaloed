var mongoose = require("mongoose");
var passwordHash = require("password-hash");

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  img: { type: String, default: "default.png" },
  email: { type: String, required: true, unique: true },
  password:{
    type: String,
    set: function(password){
      return passwordHash.generate(password);
    }
  }, 
  role: String,
  completedQuizzes:[{ quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }, score: Number}]
});


module.exports = mongoose.model('User', UserSchema);