require("dotenv").config();
var express = require("express");
var router = express.Router();
const multer = require("multer");
const morgan = require("morgan");
router.use(morgan("dev"));
// Create multer object
const imageUpload = multer({
  dest: "images",
});

// Image Upload Routes
router.post("/image", imageUpload.single("image"), (req, res) => {
  const { filename, mimetype, size } = req.file;
  const filepath = req.file.path;
  knex
    .insert({
      filename,
      filepath,
      mimetype,
      size,
    })
    .into("image_files")
    .then(() => res.json({ success: true, filename }))
    .catch((err) =>
      res.json({ success: false, message: "upload failed", stack: err.stack })
    );
});
// Image Get Routes
router.get("/image/:filename", (req, res) => {
  const { filename } = req.params;
  knex
    .select("*")
    .from("image_files")
    .where({ filename })
    .then((images) => {
      if (images[0]) {
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, images[0].filepath);
        return res.type(images[0].mimetype).sendFile(fullfilepath);
      }
      return Promise.reject(new Error("Image does not exist"));
    })
    .catch((err) =>
      res
        .status(404)
        .json({ success: false, message: "not found", stack: err.stack })
    );
});
module.exports = router;
