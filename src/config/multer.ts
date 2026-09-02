import multer from "multer";
import path from "node:path";

// Usar o memoryStorage para manter o arquivo em memoria e enviar pro cloudinary
export default {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024, // 4mb
  },
  fileFilter: (__req: any, file: Express.Multer.File, cb: any) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const extension = path.extname(file.originalname).toLowerCase();

    const isAllowed =
      allowedMimes.includes(file.mimetype) ||
      (file.mimetype === "application/octet-stream" &&
        allowedExtensions.includes(extension));

    if (isAllowed) {
      return cb(null, true);
    }

    return cb(new Error("Unexpected file type, only upload JPG, JPEG, PNG."));
  },
};
