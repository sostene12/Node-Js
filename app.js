const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// setting up an express app
const app = express();

//connect to mongodb
const db =
  "mongodb+srv://sostene:CaGUc402jkLlf1LJ@cluster0.tvlir.mongodb.net/node-js?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("the connection is complete");
    // listen port
    const port = 3000;
    app.listen(port, () => {
      console.log("app is listening on port " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// register view
app.set("view engine", "ejs");

// by default ejs looks in your directory and search for folde called views
// app.set("views","my views") ; //setting up  another folder if necessary

// middleware
app.use(morgan("dev"));

// middleware and ststic files
app.use(express.static("public"));

app.get("/", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
