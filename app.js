const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

const req = require("express/lib/request");
const { result } = require("lodash");

// setting up an express app
const app = express();

// middlewares
app.use(morgan("dev"));

// middleware and ststic files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

// monngoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "Second blog",
    snippet: "The introduction to node",
    body: "The node js backend possibilities",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

// getting all blogs from the database
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

// getting single blog
app.get("/single-blog", (req, res) => {
  Blog.findById("624c6ef8efde2cc5365ff45b")
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

// register view
app.set("view engine", "ejs");

// by default ejs looks in your directory and search for folde called views
// app.set("views","my views") ; //setting up  another folder if necessary

// blog routes
app.use("/blogs", blogRoutes);

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// 404 page
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
