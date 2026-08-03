/**
 * components/admin/ProductForm.jsx
 * ------------------------------------------------------
 * Form tạo/sửa sản phẩm - dùng chung cho create và update.
 * Xây dựng FormData để gửi kèm upload ảnh (thumbnail + gallery).
 * ------------------------------------------------------
 */

import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import ImageUploadInput from './ImageUploadInput';
import MultiImageUploadInput from './MultiImageUploadInput';

const emptyForm = {
  name: '',
  categoryId: '',
  price: '',
  salePrice: '',
  quantity: '',
  material: '',
  color: '',
  size: '',
  description: '',
  isNew: false,
  isSale: false,
  isBest: false,
  status: 'active',
};

const ProductForm = ({ product, categories, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(emptyForm);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [removedImageIds, setRemovedImageIds] = useState([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        categoryId: product.categoryId || '',
        price: product.price || '',
        salePrice: product.salePrice || '',
        quantity: product.quantity ?? '',
        material: product.material || '',
        color: product.color || '',
        size: product.size || '',
        description: product.description || '',
        isNew: !!product.isNew,
        isSale: !!product.isSale,
        isBest: !!product.isBest,
        status: product.status || 'active',
      });
      setExistingImages(product.images || []);
    } else {
      setForm(emptyForm);
      setExistingImages([]);
    }
    setThumbnailFile(null);
    setNewGalleryFiles([]);
    setRemovedImageIds([]);
    setErrors({});
  }, [product]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Vui lòng nhập tên sản phẩm';
    if (!form.price || Number(form.price) < 0) newErrors.price = 'Giá không hợp lệ';
    if (!product && !thumbnailFile) newErrors.thumbnail = 'Vui lòng chọn ảnh đại diện';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== '' && value !== null) formData.append(key, value);
    });
    if (thumbnailFile) formData.append('thumbnail', thumbnailFile);
    newGalleryFiles.forEach((file) => formData.append('images', file));

    onSubmit(formData, removedImageIds);
  };

  const handleRemoveExisting = (imageId) => {
    setExistingImages((imgs) => imgs.filter((img) => img.id !== imageId));
    setRemovedImageIds((ids) => [...ids, imageId]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Tên sản phẩm *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-dark/80 dark:text-gray-light/80">Danh mục</label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="w-full rounded-lg border border-wood/20 px-4 py-2.5 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-900 dark:focus:border-accent"
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <Input
          label="Giá *"
          type="number"
          min="0"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          error={errors.price}
        />
        <Input
          label="Giá khuyến mãi"
          type="number"
          min="0"
          value={form.salePrice}
          onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
        />
        <Input
          label="Số lượng"
          type="number"
          min="0"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <Input label="Chất liệu" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
        <Input label="Màu sắc" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
        <Input label="Kích thước" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-dark/80 dark:text-gray-light/80">Mô tả</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-lg border border-wood/20 px-4 py-2.5 text-sm outline-none focus:border-wood dark:border-gray-light/15 dark:bg-neutral-900 dark:focus:border-accent"
        />
      </div>

      <div className="flex flex-wrap gap-5">
        {[
          { key: 'isNew', label: 'Sản phẩm mới' },
          { key: 'isSale', label: 'Giảm giá' },
          { key: 'isBest', label: 'Best Seller' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
              className="h-4 w-4 accent-wood dark:accent-accent"
            />
            {label}
          </label>
        ))}

        <label className="flex items-center gap-2 text-sm">
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="rounded-lg border border-wood/20 px-2 py-1 text-sm dark:border-gray-light/15 dark:bg-neutral-900"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Ẩn</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <ImageUploadInput label="Ảnh đại diện *" existingImageUrl={product?.thumbnail} onChange={setThumbnailFile} />
          {errors.thumbnail && <p className="mt-1 text-xs text-red-500">{errors.thumbnail}</p>}
        </div>
        <MultiImageUploadInput
          label="Ảnh gallery"
          existingImages={existingImages}
          onRemoveExisting={handleRemoveExisting}
          newFiles={newGalleryFiles}
          onChangeNewFiles={setNewGalleryFiles}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Hủy</Button>
        <Button type="submit" loading={loading}>{product ? 'Cập nhật' : 'Tạo mới'}</Button>
      </div>
    </form>
  );
};

export default ProductForm;
