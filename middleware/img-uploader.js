const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // The folder in Cloudinary to store the images
    allowedFormats: ["jpg", "jpeg", "png", "gif"], // Allowed image formats
  },
});

// Create multer instance
const upload = multer({ storage });

// Middleware function for image upload
const uploadImage = upload.single("image"); // 'image' is the field name for the image upload

const imageUploadMiddleware = (req, res, next) => {
  uploadImage(req, res, (error) => {
    if (error) {
      return res
        .status(400)
        .json({ error: "Image upload failed", details: error });
    }
    // Set the image URL to req.imgUrl
    req.imgUrl = req.file.path; // Cloudinary returns the URL in req.file.path
    next();
  });
};

module.exports = imageUploadMiddleware;
