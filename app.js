const express = require("express");
const ejs = require("ejs");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res)=>{
  res.render("home");
});

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`);
});

app.post("/", (req, res)=>{
  console.log("Post request received");
});
