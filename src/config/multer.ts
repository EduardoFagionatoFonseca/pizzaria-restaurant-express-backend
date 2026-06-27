import multer from "multer";

// Usar o memoryStorage para manter o arquivo em memoria e enviar pro cloudinary
export default {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024, // 4mb
  },
  fileFilter: (__req: any, file: Express.Multer.File, cb: any) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unexpected file type, only upload JPG, JPEG, PNG."));
    }
  },
};
