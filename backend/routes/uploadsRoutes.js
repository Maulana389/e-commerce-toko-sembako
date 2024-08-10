import express from 'express';
import multer from 'multer';
import cloudinary from './cloudinaryConfig.js';
import streamifier from 'streamifier';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
  if (req.file) {
    try {
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'produk', // Optional: folder di Cloudinary untuk menyimpan gambar
              allowed_formats: ['jpg', 'png', 'jpeg']
            },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      const result = await streamUpload(req.file.buffer);

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

export default router;
