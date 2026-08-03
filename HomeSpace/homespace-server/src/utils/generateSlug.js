/**
 * utils/generateSlug.js
 * ------------------------------------------------------
 * Tạo slug từ tiếng Việt có dấu (VD: "Sofa Băng Milano" -> "sofa-bang-milano")
 * và đảm bảo slug là duy nhất trong bảng bằng cách thêm hậu tố -2, -3...
 * nếu đã tồn tại.
 * ------------------------------------------------------
 */

const slugify = require('slugify');

/**
 * @param {string} text - Chuỗi cần tạo slug (VD: tên sản phẩm)
 * @param {import('sequelize').Model} model - Model Sequelize để kiểm tra trùng (Product, Category, News...)
 * @param {number|null} excludeId - id hiện tại cần loại trừ khi update (tránh so với chính nó)
 */
const generateUniqueSlug = async (text, model, excludeId = null) => {
  const baseSlug = slugify(text, { lower: true, strict: true, locale: 'vi' });
  let slug = baseSlug;
  let counter = 2;

  // Import Op tại đây để tránh vòng lặp require ở đầu file
  const { Op } = require('sequelize');

  // eslint-disable-next-line no-await-in-loop
  while (
    await model.findOne({
      where: {
        slug,
        ...(excludeId ? { id: { [Op.ne]: excludeId } } : {}),
      },
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
};

module.exports = { generateUniqueSlug };
