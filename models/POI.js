var mongoose = require("mongoose");
var POISchema = new mongoose.Schema({
  name: String,
  lat: String,
  lng: String,
  img: String,
  desc: String,
  slug: String
});
module.exports = mongoose.model('POI', POISchema);