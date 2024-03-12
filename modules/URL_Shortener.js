let mongoose = require("mongoose");
let shortId = require("shortid");

let urlShortenerSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    default: 0,
    required: true,
  },
});
module.exports = mongoose.model("URL_Shortener", urlShortenerSchema);
