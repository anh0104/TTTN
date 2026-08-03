/**
 * middleware/upload.middleware.js
 * ------------------------------------------------------
 * Cấu hình Multer để upload ảnh (products, banners, news, avatars).
 * - Lưu file trực tiếp vào src/uploads/<folder> với tên file duy nhất.
 * - Giới hạn dung lượng và chỉ cho phép định dạng ảnh.
 * ------------------------------------------------------
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ApiError = require('../utils/ApiError');

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Tạo storage engine cho một folder cụ thể (products | banners | news | avatars)
 */
const createStorage = (folder) => {
  const uploadPath = path.join(__dirname, '..', 'uploads', folder);

  // Đảm bảo thư mục tồn tại
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${folder}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, uniqueName);
    },
  });
};

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(ApiError.badRequest('Chỉ chấp nhận file ảnh định dạng: jpg, jpeg, png, webp, gif'), false);
  }
};

/**
 * Factory tạo middleware upload cho từng loại tài nguyên.
 * @param {string} folder - 'products' | 'banners' | 'news' | 'avatars'
 */
const createUploader = (folder) =>
  multer({
    storage: createStorage(folder),
    fileFilter,
    limits: { fileSize: Number(process.env.UPLOAD_MAX_SIZE) || 5 * 1024 * 1024 },
  });

const ALLOWED_FOLDERS = ['products', 'banners', 'news', 'avatars', 'site'];

/**
 * Middleware upload động cho endpoint chung POST /api/upload?folder=xxx
 * Đọc query 'folder' để quyết định nơi lưu, mặc định 'products'.
 */
const dynamicSingleUpload = (req, res, next) => {
  const folder = ALLOWED_FOLDERS.includes(req.query.folder) ? req.query.folder : 'products';
  req.uploadFolder = folder;
  return createUploader(folder).single('file')(req, res, next);
};

const dynamicMultipleUpload = (req, res, next) => {
  const folder = ALLOWED_FOLDERS.includes(req.query.folder) ? req.query.folder : 'products';
  req.uploadFolder = folder;
  return createUploader(folder).array('files', 8)(req, res, next);
};

module.exports = {
  uploadProductImages: createUploader('products'),
  uploadBannerImage: createUploader('banners'),
  uploadNewsImage: createUploader('news'),
  uploadAvatar: createUploader('avatars'),
  dynamicSingleUpload,
  dynamicMultipleUpload,
};
