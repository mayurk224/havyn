import multer from "multer";

// Use memory storage so we don't write to the server's disk
const storage = multer.memoryStorage();

// Strict validation to prevent users from uploading PDFs, scripts, etc.
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // 1MB limit per image
  },
  fileFilter,
});
