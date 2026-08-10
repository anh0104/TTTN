/**
 * pages/admin/SettingsManagePage.jsx
 * ------------------------------------------------------
 * Quản lý giao diện: Logo, màu chủ đạo, Dark Mode mặc định,
 * bật/tắt các section trang chủ (Sản phẩm mới/Best Seller/Flash Sale/Tin tức).
 * ------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import settingService from '../../services/settingService';
import uploadService from '../../services/uploadService';
import { updateSettingsThunk } from '../../redux/slices/settingSlice';
import ImageUploadInput from '../../components/admin/ImageUploadInput';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const toggleFields = [
  { key: 'show_new_products', label: 'Hiển thị Sản phẩm mới' },
  { key: 'show_flash_sale', label: 'Hiển thị Flash Sale' },
  { key: 'show_best_seller', label: 'Hiển thị Best Seller' },
  { key: 'show_news', label: 'Hiển thị Tin tức' },
];

const ToggleSwitch = ({ checked, onChange, label }) => (
  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-wood/10 bg-white p-4 shadow-sm hover:border-wood/20 dark:border-gray-light/10 dark:bg-neutral-800/60 transition-all">
    <span className="text-sm font-semibold text-dark/85 dark:text-gray-light/90">{label}</span>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none ${
        checked ? 'bg-[#284c38] dark:bg-accent' : 'bg-gray-300 dark:bg-neutral-700'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          checked ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
    </button>
  </label>
);

const SettingsManagePage = () => {
  const [settings, setSettings] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    settingService.getSettings().then((res) => setSettings(res.data.data)).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      let logoUrl = settings.logo;
      if (logoFile) {
        const uploadRes = await uploadService.uploadSingle(logoFile, 'site');
        logoUrl = uploadRes.data.data.url;
      }

      const payload = { ...settings, logo: logoUrl };
      const updatedData = await dispatch(updateSettingsThunk(payload)).unwrap();
      setSettings(updatedData);
      setLogoFile(null);
      toast.success('Cập nhật giao diện thành công');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="animate-fade-in max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Quản lý giao diện</h1>

      <div className="rounded-xl border border-wood/10 bg-white p-5 dark:border-gray-light/10 dark:bg-neutral-900">
        <h3 className="mb-4 font-semibold">Logo website</h3>
        <ImageUploadInput existingImageUrl={settings.logo} onChange={setLogoFile} />
      </div>


      <div className="rounded-xl border border-wood/10 bg-white p-5 dark:border-gray-light/10 dark:bg-neutral-900">
        <h3 className="mb-4 font-semibold">Giao diện mặc định</h3>
        <ToggleSwitch
          label="Dark Mode mặc định cho khách mới truy cập"
          checked={settings.dark_mode_default === 'true'}
          onChange={(val) => setSettings({ ...settings, dark_mode_default: String(val) })}
        />
      </div>

      <div className="rounded-xl border border-wood/10 bg-white p-5 dark:border-gray-light/10 dark:bg-neutral-900">
        <h3 className="mb-4 font-semibold">Hiển thị / Ẩn section trang chủ</h3>
        <div className="space-y-2">
          {toggleFields.map(({ key, label }) => (
            <ToggleSwitch
              key={key}
              label={label}
              checked={settings[key] !== 'false'}
              onChange={(val) => setSettings({ ...settings, [key]: String(val) })}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleSave} loading={saving} size="lg">Lưu thay đổi</Button>
    </div>
  );
};

export default SettingsManagePage;
