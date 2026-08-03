/**
 * components/admin/MultiImageUploadInput.jsx
 * ------------------------------------------------------
 * Input chọn nhiều ảnh gallery cho sản phẩm, hiển thị ảnh đã có
 * (existingImages) + ảnh mới chọn thêm, cho phép xóa ảnh đã có.
 * ------------------------------------------------------
 */

import { X, ImagePlus } from 'lucide-react';
import { getImageUrl } from '../../utils/format';

const MultiImageUploadInput = ({ label, existingImages = [], onRemoveExisting, newFiles, onChangeNewFiles }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    onChangeNewFiles([...newFiles, ...files]);
  };

  const removeNewFile = (index) => {
    onChangeNewFiles(newFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-medium text-dark/80 dark:text-gray-light/80">{label}</label>}
      <div className="flex flex-wrap gap-3">
        {existingImages.map((img) => (
          <div key={img.id} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-wood/15 dark:border-gray-light/15">
            <img src={getImageUrl(img.image)} alt="Ảnh sản phẩm" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemoveExisting(img.id)}
              className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-dark/70 text-white"
              aria-label="Xóa ảnh"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {newFiles.map((file, index) => (
          <div key={index} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-wood/15 dark:border-gray-light/15">
            <img src={URL.createObjectURL(file)} alt="Ảnh mới" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeNewFile(index)}
              className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-dark/70 text-white"
              aria-label="Xóa ảnh"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        <label className="flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-wood/25 text-dark/40 hover:border-wood dark:border-gray-light/20 dark:text-gray-light/40 dark:hover:border-accent">
          <ImagePlus size={18} />
          <span className="text-[10px]">Thêm ảnh</span>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default MultiImageUploadInput;
