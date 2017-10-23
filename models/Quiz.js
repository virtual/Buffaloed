var mongoose = require("mongoose");

// var LeaderBoardSchema = new mongoose.Schema([{
//   score: {type: Number}, 
//   slug: {type: String} 
// }])

var QuizSchema = new mongoose.Schema({
  //email: { type: String, required: true },
  slug: String,
  leaderBoard: [{
    score: {type: Number}, 
    //slug: {type: String},
    email: String
  }]
});


module.exports = mongoose.model('Quiz', QuizSchema);