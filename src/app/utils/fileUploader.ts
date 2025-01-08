import multer from 'multer';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
import { Express } from 'express';

cloudinary.config({
  cloud_name: 'daar91zv4',
  api_key: '573799455418682',
  api_secret: 'gzo1SMIvFxeau3-bPvE-RQDxVQQ',
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMultiple = multer({ storage }).array('files', 10);

const uploadToCloudinary = (
  file: Express.Multer.File
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const filename = `${file.originalname.split('.')[0]}-${Date.now()}`;

    const stream = cloudinary.uploader.upload_stream(
      { public_id: filename },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!);
        }
      }
    );

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);
    readableStream.pipe(stream);
  });
};

const uploadMultipleToCloudinary = (
  files: Express.Multer.File | Express.Multer.File[]
): Promise<string[]> => {
  const fileArray = Array.isArray(files) ? files : [files];

  const uploadPromises = fileArray.map(
    (file) =>
      new Promise<string>((resolve, reject) => {
        const filename = `${file.originalname.split('.')[0]}-${Date.now()}`;

        const stream = cloudinary.uploader.upload_stream(
          { public_id: filename },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result!.secure_url);
            }
          }
        );

        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);
        readableStream.pipe(stream);
      })
  );

  return Promise.all(uploadPromises);
};

export const fileUploader = {
  upload,
  uploadMultiple,
  uploadToCloudinary,
  uploadMultipleToCloudinary,
};
