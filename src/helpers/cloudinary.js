import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
    cloud_name: "dw1gshqw4",
    api_key: "937484887355715",
    api_secret: "inVGIBOq6DJy-gzBz0Qq91ywkQ0",
});

const storage = multer.memoryStorage();  // Buffer storage for file uploads

// Convert buffer to base64 and upload to Cloudinary
async function imageUploadUtil(buffer) {
  return new Promise((resolve, reject) => {
    // Convert buffer to base64 string
    const base64String = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    cloudinary.uploader.upload(base64String, { resource_type: "image" }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

const upload = multer({ storage });

// Export the upload and imageUploadUtil as named exports
export { upload, imageUploadUtil };
