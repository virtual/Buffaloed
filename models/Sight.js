var mongoose = require("mongoose");
var SightSchema = new mongoose.Schema({
  name: String,
  lat: String,
  lng: String,
  img: String,
  desc: String,
  type: String,
  slug: String
});
module.exports = mongoose.model('Sight', SightSchema);