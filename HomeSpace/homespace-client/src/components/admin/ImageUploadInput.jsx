/**
 * components/admin/ImageUploadInput.jsx
 * ------------------------------------------------------
 * Input chọn ảnh (1 ảnh) kèm xem trước, dùng cho form
 * Product thumbnail / Banner / News / Avatar.
 * ------------------------------------------------------
 */

import { useState, useEffect } from 'react';
import { ImagePlus } from 'lucide-react';
import { getImageUrl } from '../../utils/format';

const ImageUploadInput = ({ label, existingImageUrl, onChange }) => {
  const [preview, setPreview] = useState(existingImageUrl ? getImageUrl(existingImageUrl) : null);

  useEffect(() => {
    setPreview(existingImageUrl ? getImageUrl(existingImageUrl) : null);
  }, [existingImageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-medium text-dark/80 dark:text-gray-light/80">{label}</label>}
      <label className="flex aspect-video w-full max-w-xs cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-wood/25 bg-gray-light hover:border-wood dark:border-gray-light/20 dark:bg-neutral-800 dark:hover:border-accent">
        {preview ? (
          <img src={preview} alt="Xem trước" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-dark/40 dark:text-gray-light/40">
            <ImagePlus size={24} />
            <span className="text-xs">Chọn ảnh</span>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
};

export default ImageUploadInput;
