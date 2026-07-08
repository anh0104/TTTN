// ─────────────────────────────────────────────────────────────
// SHARED PUCK FIELD DEFINITIONS
// Reuse across all components
// ─────────────────────────────────────────────────────────────

export const BACKGROUND_TYPES = [
  { value: 'color',          label: 'Màu sắc' },
  { value: 'gradient',       label: 'Gradient' },
  { value: 'image',          label: 'Hình ảnh' },
  { value: 'image+gradient', label: 'Hình ảnh & Gradient' },
  { value: 'image+color',    label: 'Hình ảnh & Màu sắc' },
]

export const GRADIENT_DIRECTIONS = [
  { value: 'to right',        label: 'Trái → Phải' },
  { value: 'to left',         label: 'Phải → Trái' },
  { value: 'to bottom',       label: 'Trên → Dưới' },
  { value: 'to bottom right', label: 'Góc trên-trái → dưới-phải' },
  { value: 'to bottom left',  label: 'Góc trên-phải → dưới-trái' },
]

// Build CSS background string from bg props
export function buildBackground(props) {
  const {
    bgType = 'gradient',
    bgColor = '#064E3B',
    bgGradientFrom = '#064E3B',
    bgGradientTo = '#059669',
    bgGradientDir = 'to bottom right',
    bgImage = '',
    bgOverlayColor = 'rgba(6,78,59,0.7)',
  } = props

  switch (bgType) {
    case 'color':
      return bgColor
    case 'gradient':
      return `linear-gradient(${bgGradientDir}, ${bgGradientFrom}, ${bgGradientTo})`
    case 'image':
      return bgImage ? `url(${bgImage}) center/cover no-repeat` : bgColor
    case 'image+gradient':
      return bgImage
        ? `linear-gradient(${bgGradientDir}, ${bgGradientFrom}cc, ${bgGradientTo}88), url(${bgImage}) center/cover no-repeat`
        : `linear-gradient(${bgGradientDir}, ${bgGradientFrom}, ${bgGradientTo})`
    case 'image+color':
      return bgImage
        ? `linear-gradient(${bgOverlayColor}, ${bgOverlayColor}), url(${bgImage}) center/cover no-repeat`
        : bgColor
    default:
      return `linear-gradient(${bgGradientDir}, ${bgGradientFrom}, ${bgGradientTo})`
  }
}

// Shared background fields for Puck config
export const BG_FIELDS = {
  bgType: {
    type: 'select',
    label: 'Kiểu nền',
    options: BACKGROUND_TYPES,
  },
  bgColor: { type: 'text', label: 'Màu nền (hex/rgba)' },
  bgGradientFrom: { type: 'text', label: 'Gradient: Màu đầu' },
  bgGradientTo: { type: 'text', label: 'Gradient: Màu cuối' },
  bgGradientDir: {
    type: 'select',
    label: 'Hướng gradient',
    options: GRADIENT_DIRECTIONS,
  },
  bgImage: { type: 'text', label: 'URL ảnh nền' },
  bgOverlayColor: { type: 'text', label: 'Màu overlay (rgba)' },
}

// Shared button field
export const BUTTON_FIELDS = {
  type: 'array',
  label: 'Danh sách nút',
  arrayFields: {
    label:   { type: 'text', label: 'Chữ nút' },
    href:    { type: 'text', label: 'Link' },
    bgColor: { type: 'text', label: 'Màu nền nút' },
    textColor: { type: 'text', label: 'Màu chữ nút' },
    style: {
      type: 'select', label: 'Kiểu nút',
      options: [{ value: 'solid', label: 'Solid' }, { value: 'outline', label: 'Outline' }],
    },
  },
  defaultItemProps: { label: 'Khám phá', href: '#', bgColor: '#F59E0B', textColor: '#fff', style: 'solid' },
}

// Default BG props for hero
export const DEFAULT_BG = {
  bgType: 'gradient',
  bgColor: '#064E3B',
  bgGradientFrom: '#064E3B',
  bgGradientTo: '#059669',
  bgGradientDir: 'to bottom right',
  bgImage: '',
  bgOverlayColor: 'rgba(6,78,59,0.75)',
}