import path from 'path';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import cloudinary from './cloudinaryConfig.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Images only'), false);
  }
};

const upload = multer({ storage,fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'produk', // Optional: folder di Cloudinary untuk menyimpan gambar
          allowed_formats: ['jpg','png','jpe']
        });

        // Hapus file lokal setelah diunggah ke Cloudinary
        fs.unlink(req.file.path);

        res.status(200).send({
          message: 'Image uploaded successfully',
          image: result.secure_url,
        });
      } catch (uploadError) {
        res.status(500).send({ message: 'Error uploading to Cloudinary', error: uploadError });
      }
    } else {
      res.status(400).send({ message: 'No image file provided' });
    }
  });
});

export default router;
