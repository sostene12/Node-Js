const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blogController");

// blog routes
router.get("/", blogController.blog_index);

router.get("/create", blogController.blog_create_get);
// deleting a blog
router.delete("/:id", blogController.blog_delete);
//   getting the blog by id
router.get("/:id", blogController.blog_details);
// creating a new blog
router.post("/", blogController.blog_create_post);

module.exports = router;
