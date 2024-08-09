require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { Image } = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

const multer = require("multer");
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const image = await Image.create({
      name: req.file.originalname,
      image: req.file.buffer,
    });
    res.json({ message: "Image uploaded successfully", imageId: image.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

app.get("/images", async (req, res) => {
  try {
    const images = await Image.findAll();
    const imageArray = images.map((image) => image.toJSON());

    imageArray.forEach((image) => {
      if (image.image) {
        image.image = Buffer.from(image.image).toString("base64");
      } else {
        image.image = null;
      }
    });

    res.json(imageArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching images" });
  }
});

app.listen(PORT, () => {
  console.log(`test imgage app listening on PORT ${PORT}`);
});
