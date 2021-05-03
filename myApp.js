var express = require("express");
var app = express();

console.log("Hello World");

app.use(function (req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

// app.get("/", function(req, res) {
//   res.send("Hello Express");
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  if (process.env["MESSAGE_STYLE"] === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
