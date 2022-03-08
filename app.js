const express = require("express");
const app = express();
const ejs = require("ejs");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res)=>{
  res.render("home");
});

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`);
});
