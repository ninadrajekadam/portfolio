import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "uploads/skills";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const skillName = req.body.skillName ? req.body.skillName.toLowerCase().replace(/\s+/g, "-") : "skill";
    const ext = path.extname(file.originalname);

    cb(null, `${skillName}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;