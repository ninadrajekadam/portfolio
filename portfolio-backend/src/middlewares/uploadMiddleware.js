import multer from "multer";
import path from "path";
import fs from "fs";

const basePath = path.join(process.cwd(), "uploads");
const folders = ["skills", "projects", "profile", "pdf"];

folders.forEach((folder) => {
  const dir = path.join(basePath, folder);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = basePath;

    if (file.fieldname === "skillImage") folder = path.join(basePath, "skills");
    else if (file.fieldname === "projectImage") folder = path.join(basePath, "projects");
    else if (file.fieldname === "profileImage") folder = path.join(basePath, "profile");
    else if (file.fieldname === "cvFile") folder = path.join(basePath, "pdf");

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    const uniqueName = `${Date.now()}-${safeName}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|webp/;
  const pdfTypes = /pdf/;

  const ext = path.extname(file.originalname).toLowerCase();

  const isImage = imageTypes.test(ext);
  const isPdf = pdfTypes.test(ext);

  if (file.fieldname === "cvFile") {
    if (isPdf || file.mimetype === "application/pdf") {
      return cb(null, true);
    }
    return cb(new Error("Only PDF allowed for resume"));
  }

  if (isImage || file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  return cb(new Error("Invalid file type"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;