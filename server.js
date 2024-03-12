let express = require("express");
let app = express();
let mongoose = require("mongoose");
const URL_Shortener = require("./modules/URL_Shortener");
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
mongoose.connect("mongodb://127.0.0.1:27017/URL_Shortener");

app.get("/", async (req, res) => {
  let urls = await URL_Shortener.find();
  res.render("index", { urls });
});
app.post("/shortUrl", async (req, res) => {
  await URL_Shortener.create({ full: req.body.fullURL });
  res.redirect("/");
});
app.get("/:url", async (req, res) => {
  let url = await URL_Shortener.findOne({ short: req.params.url });
  if (url === null) res.sendStatus(404);
  url.clicks++;
  await url.save();
  res.redirect(url.full);
});

app.listen(process.env.PORT || 5000);
